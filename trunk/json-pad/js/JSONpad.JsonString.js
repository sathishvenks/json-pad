var MenuFunctions = {
	quitApplication: function () {
		//@todo Derzeit geht schließen nur für Air
		if ( Ext.isAir )
		{
			airApplicationExit();
		}
	},

	resetApplication: function () {
		Ext.getCmp("JsonStringForm_jsonString").setValue('');

		Ext.getCmp("JsonTree").setRootNode( JsonTreeFunctions.getDefaultRootNode("object", null) );
	},

	compressJsonString: function () {
		var txt = Ext.getCmp("JsonStringForm_jsonString").getValue();
		var row = null;
		var txtArray = txt.split("\n");
		var txtString = "";
		for (row in txtArray)
		{
			if (row != "remove")
				txtString += String(txtArray[row]).trim();
		}

		Ext.getCmp("JsonStringForm_jsonString").setValue( txtString );
	},

	copyFromJsonStringToClipboard: function () {
		var txt = Ext.getCmp("JsonStringForm_jsonString").getValue();

		if ( Ext.isAir )
		{
			air.Clipboard.generalClipboard.clear();
			air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT, txt, false);

			setStatusbarStatus("JSON String erfolgreich in die Zwischenablage kopiert", "valid", true);
		}
	},


	getFromClipboardToJsonString: function () {
		var txt = "";
		if ( Ext.isAir )
		{
			txt = air.Clipboard.generalClipboard.getData( air.ClipboardFormats.TEXT_FORMAT );

			if (txt == null)
				txt = "";
		}

		Ext.getCmp("JsonStringForm_jsonString").setValue( txt );

		setStatusbarStatus("JSON String erfolgreich von Zwischenablage kopiert", "valid", true);
	},

	showAboutWindow: function () {
		Ext.MessageBox.show({
			title: 'About JSONpad - v' + UpdateApplication.getApplicationVersion(),
			msg: aboutWindow,
			buttons: Ext.MessageBox.OK,
			animEl: 'btn_menu_help_about',
			minWidth: 300,
			width: 400
		});

		Ext.select("a.link-to-browser").on("click", function (e, el) {
			var href = el.id;
			openUrl(href);
			return false;
		});
	}
};

var JsonStringFunctions = {
	loadJsonStringToTree: function() {
		setStatusbarBusy( true );

		var value = Ext.getCmp("JsonStringForm_jsonString").getValue();

		try
		{
			var jsonObject = Ext.util.JSON.decode(value);
		}
		catch (e)
		{
			setStatusbarStatus("No valid JSON data", "error", true);
			return;
		}

		var rootType = getObjectType( jsonObject );

		var itemsForTree = buildObjectForTree(jsonObject, [], 0, (rootType == "array"));

		var root = JsonTreeFunctions.getDefaultRootNode( rootType, itemsForTree );

		var jsonTree = Ext.getCmp("JsonTree");
		jsonTree.setRootNode(root);
		jsonTree.getLoader().load( jsonTree.root );

		setStatusbarBusy( false );
		setStatusbarStatus('JSON String successfully loaded into tree view', "valid", true);
	},

	loadTreeToJsonString: function () {
		var jsonTree = Ext.getCmp("JsonTree");
		var rootNode = jsonTree.getRootNode();
		var jsonString = "";

		setStatusbarBusy( true );

		if ( rootNode.attributes.isArray )
			jsonString += "[\n";
		else
			jsonString += "{\n";

		jsonString = buildJSONStringFromTree ( rootNode, jsonString, 0 );

		if ( rootNode.attributes.isArray )
			jsonString += "]\n";
		else
			jsonString += "}\n";

		/*if (jsonString.substring(0,1) == "\t")
			jsonString = jsonString.substring(1, jsonString.length);
		if (jsonString.substring(0,1) == "\t")
			jsonString = jsonString.substring(1, jsonString.length);
*/
		Ext.getCmp("JsonStringForm_jsonString").setValue( jsonString.trim() );

		setStatusbarBusy( false );
		setStatusbarStatus('JSON string successfully build', "valid", true);
	},

	setExampleToJsonString: function () {
		Ext.getCmp("JsonStringForm_jsonString").setValue( this.example );

		setStatusbarStatus('"' + this.text + '" inserted into JSON string', "valid", true);
	}
};

var buildJSONStringFromTree = function ( node, jsonString, lvl ) {
	if (!lvl) lvl = 0;

	lvl++;

	var tab = "";
	for (var i = 1; i < lvl; i++)
		tab += "\t";

	var collapseNode = false;
	if ( node.isExpandable() && !node.isExpanded() )
	{
		collapseNode = true;
		node.expand();
	}

	node.eachChild(function (child) {
		if ( child.hasChildNodes() )
		{
			if ( child.attributes.type == "array" )
				jsonString += tab + '\t"' + child.attributes.text + '": [\n';
			else
			{
				jsonString += tab + '\t';

				if ( node.attributes.type != "array" )
					jsonString += '"' + child.attributes.text + '": ';

				jsonString += '{\n';
			}

			jsonString = tab + buildJSONStringFromTree ( child, jsonString, lvl );

			if ( child.attributes.type == "array" )
				jsonString += tab + '\t]';
			else
				jsonString += tab + '\t}';

			jsonString += ( !child.isLast() ? "," : "" ) + '\n';
		}
		else
		{
			var nodeValue = child.attributes.value;

			if ( child.attributes.type == "string" )
				nodeValue = '"' + nodeValue + '"';


			jsonString += tab + '\t';

			if ( node.attributes.type == "array" )
				jsonString += nodeValue;
			else
				jsonString += '"' + child.attributes.text + '": ' + nodeValue;

			jsonString += ( !child.isLast() ? "," : "" ) + '\n';
		}
	});

	if ( collapseNode )
		node.collapse();

	return jsonString;
};

var buildObjectForTree = function (obj, treeObj, lvl, parentIsArray) {
	if (!lvl) lvl = 0;

	lvl++;

	var ind = null;
	var counter = 1;
	for (ind in obj) {
		if (ind != "remove") {
			var text = ind;
			var qtip = '';
			var itemValueType = '';
			
			var nodeObject = new Object();

			nodeObject.id =  lvl + '_' + counter;

			if ( isObject( obj[ind] ) && obj[ind] != null )
			{
				if ( parentIsArray )
					text = "[object Object] #" + ind;

				itemValueType = getObjectType( obj[ind] );

				qtip += '<div class=\'tree-qtip-cell-caption\'><b>Key:</b></div>' + text  + '<br style=\'clear: both;\'/>';
				qtip += '<div class=\'tree-qtip-cell-caption\'><b>Typ:</b></div>'  + itemValueType + '<br style=\'clear: both;\'/>';

				nodeObject.iconCls = 'ico_' + itemValueType;
				nodeObject.expandable = true;
				nodeObject.draggable = false;
				nodeObject.leaf = false;
				nodeObject.children = buildObjectForTree(obj[ind], [], lvl, (itemValueType == "array"));
			}
			else
			{
				if (parentIsArray)
					text = obj[ind];

				if (obj[ind] == null)
					itemValueType = "null";

				if ( isString(obj[ind]) )
					itemValueType = "string";

				if ( !isNaN(obj[ind]) && !isString(obj[ind]) && obj[ind] != null )
					itemValueType = "number";

				qtip += '<div class=\'tree-qtip-cell-caption\'><b>Key:</b></div>' + text  + '<br style=\'clear: both;\'/>';
				qtip += '<div class=\'tree-qtip-cell-caption\'><b>Value:</b></div>' + obj[ind]  + '<br style=\'clear: both;\'/>';
				qtip += '<div class=\'tree-qtip-cell-caption\'><b>Typ:</b></div>'  + itemValueType + '<br style=\'clear: both;\'/>';

				//nodeObject.iconCls = '';
				nodeObject.expandable = false;
				nodeObject.draggable = true;
				nodeObject.leaf = true;
				nodeObject.value = obj[ind];
			}
			/*nodeObject.qtipCfg = new Ext.QuickTip({
text: qtip,
//title: 'Tip Title',
//anchor: 'left',
id: 'treeNodeTip',
xtype: 'quicktip',
showDelay: 3000
});*/
			nodeObject.text = text;
			nodeObject.type = itemValueType;
			nodeObject.listeners = {
				"contextmenu": function(node, event)
				{
					var jsonTree = Ext.getCmp("JsonTree");
					var selectionModel = jsonTree.getSelectionModel();
					selectionModel.select( node );

					JsonTreeStatic.contextMenu.showAt(event.getXY());
					event.stopEvent();
				}
			};

			treeObj.push( nodeObject );

			counter++;
		}
	}

	return treeObj;
};


var aboutWindow = "";

/*aboutWindow += 'Version: ' + UpdateApplication.getApplicationVersion();
aboutWindow += '<br />&nbsp;<br />&nbsp;<br />&nbsp;<br />';*/
aboutWindow += '<span style="font-size: 11px;">This project started by Christopher S&ouml;llinger. ';
aboutWindow += 'It is open source and totally<br />free under the New BSD License.<br />&nbsp;<br />';
aboutWindow += 'You can get the latest source code files at the <a href="#" id="http://code.google.com/p/json-pad/" class="link-to-browser">Google Code Project</a> page.<br />&nbsp;<br />';
aboutWindow += '<div style="float: left; width: 70px;"><b>Contact:</b></div><a href="#" id="mailto:zerogiven@gmail.com" class="link-to-browser">zerogiven@gmail.com</a><br style="clear: both;" />';
aboutWindow += '<div style="float: left; width: 70px;"><b>Homepage:</b></div><a href="#" id="http://jsonpad.web.gg" class="link-to-browser">http://jsonpad.web.gg</a><br style="clear: both;" />';
aboutWindow += '</span>';

var JSONpad_JsonStringForm = {
	initHandler: function ( me ) {

		Ext.getCmp("btn_menu_file_new").setHandler( MenuFunctions.resetApplication );
		Ext.getCmp("btn_menu_file_quit").setHandler( MenuFunctions.quitApplication );

		Ext.getCmp("btn_menu_file_copyJson").setHandler( MenuFunctions.copyFromJsonStringToClipboard );
		Ext.getCmp("btn_menu_file_pasteJson").setHandler( MenuFunctions.getFromClipboardToJsonString );

		Ext.getCmp("btn_menu_help_checkUpdate").setHandler( UpdateApplication.checkUpdate );
		Ext.getCmp("btn_menu_help_about").setHandler( MenuFunctions.showAboutWindow );


		Ext.getCmp("btn_menu_ico_loadToTree").setHandler( JsonStringFunctions.loadJsonStringToTree );
		Ext.getCmp("btn_menu_ico_loadFromTree").setHandler( JsonStringFunctions.loadTreeToJsonString );
		Ext.getCmp("btn_menu_ico_copyJson").setHandler( MenuFunctions.copyFromJsonStringToClipboard );
		Ext.getCmp("btn_menu_ico_pasteJson").setHandler( MenuFunctions.getFromClipboardToJsonString );
		Ext.getCmp("btn_menu_ico_compressJson").setHandler( MenuFunctions.compressJsonString );

		//@todo Das muss unbedingt dynamischer werden!
		Ext.getCmp("JsonStringForm_ibar_samples_1").setHandler( JsonStringFunctions.setExampleToJsonString, Ext.getCmp("JsonStringForm_ibar_samples_1") );
		Ext.getCmp("JsonStringForm_ibar_samples_2").setHandler( JsonStringFunctions.setExampleToJsonString, Ext.getCmp("JsonStringForm_ibar_samples_2") );
		Ext.getCmp("JsonStringForm_ibar_samples_3").setHandler( JsonStringFunctions.setExampleToJsonString, Ext.getCmp("JsonStringForm_ibar_samples_3") );
	},

	initEvents: function ( me ) {
	}
};