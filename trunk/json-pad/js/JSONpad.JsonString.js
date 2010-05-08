var MenuFunctions = {
    xml2jsonWindow: null,

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
	var string = Ext.getCmp("JsonStringForm_jsonString").getValue();
	var minString = jsmin("", string, 3);

	/*var str = "";
	var match = null;
	var regEx = new RegExp(/(?:"(?:[^"\\]+|\\.)*"|'(?:[^'\\]+|\\.)*')|null|true|false|[0-9]+|:|{|}|\[|\]|,|[\w]+/g);
	while (match = regEx.exec(string)) {
	    str += match[0];
	}*/
	debug.trace(minString);


	Ext.getCmp("JsonStringForm_jsonString").setValue( minString.trim() );
    },

    formatJsonString: function () {
	var string = Ext.getCmp("JsonStringForm_jsonString").getValue();
	var json = JSON.parse(string);

	Ext.getCmp("JsonStringForm_jsonString").setValue( JSON.stringify(json, null, '  ') );
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
    },

    showXML2JSONWindow: function () {
	var setXmlData = function () {
	    var value = Ext.getCmp("JsonStringForm_jsonString").getValue();

	    if (value.trim() != "")
	    {
		try
		{
		    var jsonObject = Ext.util.JSON.decode(value);
		}
		catch (e)
		{
		    setStatusbarStatus("No valid JSON data", "error", true);
		    return;
		}

		var xmlData = xmlJsonClass.json2xml(jsonObject, "  ");

		var xmlDataArr = xmlData.split("\n");
		for (var i = 0; i < xmlDataArr.length; i++)
		    xmlDataArr[i] = (i < xmlDataArr.length-1 ? "  " : "") + xmlDataArr[i];

		xmlData = "<root>\n"+xmlDataArr.join("\n")+"</root>";
		//debug.trace(defer);
		//debug.dump(xmlData, "xmlData");

		Ext.getCmp("JsonEdit_xml2jsonForm_xmlData").setValue(xmlData);
	    }
	    else
	    {
		Ext.getCmp("JsonEdit_xml2jsonForm_xmlData").setValue("");
	    }
	}

	if(!MenuFunctions.xml2jsonWindow){
	    MenuFunctions.xml2jsonWindow = new Ext.Window({
		//applyTo:'hello-win',
		layout:'fit',
		width:700,
		height:500,
		closeAction:'hide',
		plain: true,
		modal: true,
		id: 'JsonEdit_xml2jsonWindow',
		title: 'Convert XML data to a JSON string',
		items: new Ext.FormPanel({
		    //title: 'Convert Form',
		    layout: 'form',
		    frame: false,
		    border: true,
		    hideLabel: true,
		    id: 'JsonEdit_xml2jsonForm',
		    items: [
		    {
			xtype: 'ux-codemirror',
			codeMirrorPath: 'js/extern/CodeMirror',
			language: 'xml',
			hideLabel: true,
			anchor: '100% 100%',
			name: 'xmlData',
			id: 'JsonEdit_xml2jsonForm_xmlData',
			resizeCallBackFn: function (me) {
			    var el = Ext.select('.'+me.id, true);
			    var lineNumbersEl = Ext.select("."+me.id+" ~ div", true);

			    var win = Ext.get("JsonEdit_xml2jsonForm");
			    var width = win.getWidth();
			    var height = win.getHeight();

			    if (el){
				if ( me.initialized && !this.codeMirrorHidden && lineNumbersEl && count(lineNumbersEl.elements) && width )
				    width = width - lineNumbersEl.elements[0].getWidth();

				for (var i=0; i< el.elements.length; i++)
				{
				    if (width && !height)
					el.elements[i].setWidth(width);
				    else if (!width && height)
					el.elements[i].setHeight(height);
				    else if (width && height)
					el.elements[i].setSize(width-3, height-1);

				    lineNumbersEl.elements[i].setHeight(height);
				}
			    }
			},
			initCallBackFn: function (me) {
			    var formPanel = Ext.getCmp("JsonEdit_xml2jsonWindow");
			    formPanel.setWidth(formPanel.getWidth()-1);

			    setXmlData();
			}
		    }
		    ]
		}),

		buttons: [{
		    text:'Submit',
		    handler: function(){
			var xmlData = Ext.getCmp("JsonEdit_xml2jsonForm_xmlData").getValue();

			if (xmlData.trim() != "") {
			    var jsonData = xmlJsonClass.xml2json(parseXml(xmlData), "  ", false);
			    Ext.getCmp("JsonStringForm_jsonString").setValue(jsonData);
			}

			MenuFunctions.xml2jsonWindow.hide();
		    }
		},{
		    text: 'Close',
		    handler: function(){
			MenuFunctions.xml2jsonWindow.hide();
		    }
		}]
	    });
	}
	else
	{
	    setXmlData();
	}

	MenuFunctions.xml2jsonWindow.show();
    },

    addStatusBarTip: function (item) {
	if (item.statusBarTip != null && item.statusBarTip != "")
	{
	    item.getEl().on('mouseover', function () {
		JsonStatusbarFunctions.addStatusBarTooltip(item.statusBarTip);
	    });

	    item.getEl().on('mouseout', function () {
		JsonStatusbarFunctions.clear();
	    });
	}
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

	//JsonStringFunctions.loadTreeToJsonString(false);
    },

    loadTreeToJsonString: function (compress) {
	var jsonTree = Ext.getCmp("JsonTree");
	var rootNode = jsonTree.getRootNode();
	var jsonString = "";
	var lb = "";

	setStatusbarBusy( true );

	if (!compress)
	    lb = "\n";

	if ( rootNode.attributes.isArray )
	    jsonString += "[" + lb;
	else
	    jsonString += "{" + lb;

	jsonString = buildJSONStringFromTree ( rootNode, jsonString, 0, compress, true );

	if ( rootNode.attributes.isArray )
	    jsonString += "]" + lb;
	else
	    jsonString += "}" + lb;


	Ext.getCmp("JsonStringForm_jsonString").setValue( jsonString.trim() );

	setStatusbarBusy( false );
	setStatusbarStatus('JSON string successfully build', "valid", true);
    },

    setExampleToJsonString: function () {
	Ext.getCmp("JsonStringForm_jsonString").setValue( this.example );

	setStatusbarStatus('"' + this.text + '" inserted into JSON string', "valid", true);
    }
};

var buildJSONStringFromTree = function ( node, jsonString, lvl, compress, quotes ) {
    var lb = "";
    var spacer = ""
    var pt = ":";

    if (!compress) {
	lb = "\n";
	spacer = "\t";
	pt = " : "
    }

    if (!lvl) lvl = 0;

    lvl++;

    var tab = "";
    for (var i = 1; i < lvl; i++)
	tab += spacer;

    node.eachChild(function (child) {
	if ( child.hasChildNodes() )
	{
	    if ( child.attributes.type == "array" && node.attributes.type != "array" )
		jsonString += tab + spacer + (!validJsonKey(child.attributes.text) || quotes ? '"' : '') + child.attributes.text + (!validJsonKey(child.attributes.text) || quotes ? '"' : '') + pt + '[' + lb;
	    else
	    {
		jsonString += tab + spacer;

		if ( node.attributes.type != "array" )
		    jsonString += (!validJsonKey(child.attributes.text) || quotes ? '"' : '') + child.attributes.text + (!validJsonKey(child.attributes.text) || quotes ? '"' : '') + pt;

		jsonString += (child.attributes.type != "array" ? '{' : "[") + lb;
	    }

	    jsonString = tab + buildJSONStringFromTree ( child, jsonString, lvl, compress, quotes );

	    if ( child.attributes.type == "array" )
		jsonString += tab + spacer + ']';
	    else
		jsonString += tab + spacer + '}';

	    jsonString += ( !child.isLast() ? "," : "" ) + lb;
	}
	else
	{
	    var nodeValue = child.attributes.value;

	    if ( child.attributes.type == "string" )
		nodeValue = '"' + nodeValue + '"';


	    jsonString += tab + spacer;

	    if ( node.attributes.type == "array" )
		jsonString += nodeValue;
	    else
		jsonString += (!validJsonKey(child.attributes.text) || quotes ? '"' : '') + child.attributes.text + (!validJsonKey(child.attributes.text) || quotes ? '"' : '') + pt + '' + nodeValue;

	    jsonString += ( !child.isLast() ? "," : "" ) + lb;
	}
    });

    return jsonString;
};

var buildObjectForTree = function (obj, treeObj, lvl, parentIsArray) {
    if (!lvl) lvl = 0;

    lvl++;

    var ind = null;
    var counter = 1;
    for (ind in obj) {
	if (ind != "remove" && ind != "in_array") {
	    var text = ind;
	    //var qtip = '';
	    var itemValueType = '';
			
	    var nodeObject = new Object();

	    nodeObject.id = Ext.id();
	    if ( isObject( obj[ind] ) && obj[ind] != null )
	    {
		itemValueType = getObjectType( obj[ind] );

		if ( parentIsArray )
		    text = "[object " + itemValueType.toFirstUpperCase() + "]";

		nodeObject.iconCls = 'ico_' + itemValueType;
		nodeObject.expandable = true;
		//nodeObject.draggable = true;
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

		nodeObject.expandable = false;
		//nodeObject.draggable = true;
		nodeObject.leaf = true;
		nodeObject.value = obj[ind];
	    }

	    nodeObject.text = text;
	    nodeObject.type = itemValueType;

	    treeObj.push( nodeObject );

	    counter++;
	}
    }

    return treeObj;
};


var aboutWindow = "";

aboutWindow += '<span style="font-size: 11px;">This project started by Christopher S&ouml;llinger. ';
aboutWindow += 'It is open source and totally free under the New BSD License.<br />&nbsp;<br />';
aboutWindow += 'You can get the latest source code files at the <a href="#" id="http://code.google.com/p/json-pad/" class="link-to-browser">Google Code Project</a> page.<br />&nbsp;<br />';
aboutWindow += '<div style="float: left; width: 70px;"><b>Contact:</b></div><a href="#" id="mailto:zerogiven@gmail.com" class="link-to-browser">zerogiven@gmail.com</a><br style="clear: both;" />';
aboutWindow += '<div style="float: left; width: 70px;"><b>Homepage:</b></div><a href="#" id="http://www.jsonpad.co.cc/" class="link-to-browser">http://www.jsonpad.co.cc</a><br style="clear: both;" />';
aboutWindow += '<div style="float: left; width: 70px;"><b>Blog:</b></div><a href="#" id="http://jsonpad.blogspot.com/" class="link-to-browser">http://jsonpad.blogspot.com</a><br style="clear: both;" />';
aboutWindow += '<div style="float: left; width: 70px;"><b>Twitter:</b></div><a href="#" id="http://www.twitter.com/JSONpad/" class="link-to-browser">http://www.twitter.com/JSONpad</a><br style="clear: both;" />';
aboutWindow += '</span>';

var JSONpad_JsonStringForm = {
    initHandler: function ( me ) {

	Ext.getCmp("btn_menu_file_new").setHandler( MenuFunctions.resetApplication );
	Ext.getCmp("btn_menu_file_quit").setHandler( MenuFunctions.quitApplication );

	Ext.getCmp("btn_menu_file_xml2json").setHandler( MenuFunctions.showXML2JSONWindow );
	Ext.getCmp("btn_menu_file_copyJson").setHandler( MenuFunctions.copyFromJsonStringToClipboard );
	Ext.getCmp("btn_menu_file_pasteJson").setHandler( MenuFunctions.getFromClipboardToJsonString );

	Ext.getCmp("btn_menu_help_checkUpdate").setHandler( function () {
	    UpdateApplication.checkUpdate(true);
	} );
	Ext.getCmp("btn_menu_help_about").setHandler( MenuFunctions.showAboutWindow );


	Ext.getCmp("btn_menu_ico_loadToTree").setHandler( JsonStringFunctions.loadJsonStringToTree );
	Ext.getCmp("btn_menu_ico_loadFromTree").setHandler( function () {
	    if (!JsonEditFunctions.savedKeyForm || !JsonEditFunctions.savedObjectForm)
	    {
		Ext.MessageBox.confirm("Save before loading", "Your data is unsaved. Save before loading to tree?", function (button) {
		    if (button == "yes")
		    {
			if (!JsonEditFunctions.savedKeyForm)
			    JsonEditFunctions.saveKeyData();
			if (!JsonEditFunctions.savedObjectForm)
			    JsonEditFunctions.saveObjectdata();
		    }
		    if (button == "no")
		    {
			JsonEditFunctions.setSaved(true, true);

			var jsonTree = Ext.getCmp("JsonTree");
			var selectionModel = jsonTree.getSelectionModel();
			var selectedNode = selectionModel.getSelectedNode();
			selectionModel.unselect (selectedNode);
			selectionModel.select( selectedNode );
		    }
		    JsonStringFunctions.loadTreeToJsonString(false);
		});
	    }
	    else
	    {
		JsonStringFunctions.loadTreeToJsonString(false);
	    }
	} );

	Ext.getCmp("btn_menu_ico_compress").setHandler( MenuFunctions.compressJsonString );
	Ext.getCmp("btn_menu_ico_format").setHandler( MenuFunctions.formatJsonString );

	Ext.getCmp("btn_menu_ico_copyJson").setHandler( MenuFunctions.copyFromJsonStringToClipboard );
	Ext.getCmp("btn_menu_ico_pasteJson").setHandler( MenuFunctions.getFromClipboardToJsonString );

	Ext.getCmp("btn_menu_ico_convertXml").setHandler( MenuFunctions.showXML2JSONWindow );

	/*Ext.getCmp("btn_menu_ico_loadFromTreeCompressed").setHandler( function () {
	    if (!JsonEditFunctions.savedKeyForm || !JsonEditFunctions.savedObjectForm)
	    {
		Ext.MessageBox.confirm("Save before loading", "Your data is unsaved. Save before loading to tree?", function (button) {
		    if (button == "yes")
		    {
			if (!JsonEditFunctions.savedKeyForm)
			    JsonEditFunctions.saveKeyData();
			if (!JsonEditFunctions.savedObjectForm)
			    JsonEditFunctions.saveObjectdata();
		    }
		    if (button == "no")
		    {
			JsonEditFunctions.setSaved(true, true);

			var jsonTree = Ext.getCmp("JsonTree");
			var selectionModel = jsonTree.getSelectionModel();
			var selectedNode = selectionModel.getSelectedNode();
			selectionModel.unselect (selectedNode);
			selectionModel.select( selectedNode );
		    }
		    JsonStringFunctions.loadTreeToJsonString(true);
		});
	    }
	    else
	    {
		JsonStringFunctions.loadTreeToJsonString(true);
	    }
	} );*/

	//@todo Das muss unbedingt dynamischer werden!
	Ext.getCmp("JsonStringForm_ibar_samples_1").setHandler( JsonStringFunctions.setExampleToJsonString, Ext.getCmp("JsonStringForm_ibar_samples_1") );
	Ext.getCmp("JsonStringForm_ibar_samples_2").setHandler( JsonStringFunctions.setExampleToJsonString, Ext.getCmp("JsonStringForm_ibar_samples_2") );
	Ext.getCmp("JsonStringForm_ibar_samples_3").setHandler( JsonStringFunctions.setExampleToJsonString, Ext.getCmp("JsonStringForm_ibar_samples_3") );
    },

    initEvents: function ( me ) {
	Ext.getCmp("btn_menu_file_new").addListener("render", MenuFunctions.addStatusBarTip);
	Ext.getCmp("btn_menu_file_quit").addListener("render", MenuFunctions.addStatusBarTip);

	Ext.getCmp("btn_menu_file_xml2json").addListener("render", MenuFunctions.addStatusBarTip);
	Ext.getCmp("btn_menu_file_copyJson").addListener("render", MenuFunctions.addStatusBarTip);
	Ext.getCmp("btn_menu_file_pasteJson").addListener("render", MenuFunctions.addStatusBarTip);

	Ext.getCmp("btn_menu_help_checkUpdate").addListener("render", MenuFunctions.addStatusBarTip);
	Ext.getCmp("btn_menu_help_about").addListener("render", MenuFunctions.addStatusBarTip);

	Ext.getCmp("btn_menu_ico_codeMirror").on("toggle", function (btn, pressed) {
	    debug.trace("TOGGLE!");
	    var codeMirror = Ext.getCmp("JsonStringForm_jsonString");
	    if (pressed == true) {
		codeMirror.showCodeMirror();
	    } else {
		codeMirror.hideCodeMirror();
	    }
	});
    }
};