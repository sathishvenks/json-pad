var JsonTreeFunctions = {
	deleteNode: function () {
		var jsonTree = Ext.getCmp("JsonTree");
		var selectionModel = jsonTree.getSelectionModel();
		var selectedNode = selectionModel.getSelectedNode();

		if ( selectedNode != null )
		{
			if ( selectedNode.getDepth() != 0 )
			{
				selectedNode.remove();
				JsonEditFunctions.disableEditor(true, true);
			}
		}

		JsonTreeFunctions.setTreePath(jsonTree.getRootNode());
	},

	addKeyToTree: function () {
		JsonTreeFunctions.addNodeToTree('key');
	},

	addObjectToTree: function () {
		JsonTreeFunctions.addNodeToTree('object');
	},

	addArrayToTree: function () {
		JsonTreeFunctions.addNodeToTree('array');
	},
	addNodeToTree: function ( type ) {
		var jsonTree = Ext.getCmp("JsonTree");
		var selectionModel = jsonTree.getSelectionModel();
		var selectedNode = selectionModel.getSelectedNode();
		var parentNode = null;
		var count = 0;
		var newId = "";

		if (selectedNode == null)
			selectedNode = jsonTree.getRootNode();

		if ( selectedNode.attributes.type == "object" || selectedNode.attributes.type == "array" )
			parentNode = selectedNode;
		else
			parentNode = selectedNode.parentNode;

		if ( !parentNode.hasChildNodes() && parentNode.getDepth() == 0 )
		{
			var root = JsonTreeFunctions.getDefaultRootNode( "object", [] );

			jsonTree.setRootNode(root);
			jsonTree.getLoader().load( jsonTree.root );

			parentNode = jsonTree.getRootNode();
		}

		if ( parentNode.hasChildNodes() )
			count = parentNode.childNodes.length;

		if ( parentNode.getDepth() == 0 )
		{
			newId = "treenode_1_";
		}
		else
		{
			newId = "treenode_" + (parentNode.getDepth()+1) + "_";
		}

		newId += ""+(count+1);
		var newChildConfig = null;
		switch (type)
		{
			case 'key':
				newChildConfig = {
					leaf: true,
					expandable: false,
					value: "",
					type: "string"
				};
				break;
			case 'object': case 'array':
				newChildConfig = {
					leaf: false,
					expandable: true,
					//children: [],
					type: type.toLowerCase(),
					iconCls: "ico_" + type.toLowerCase()
				};
				break;
		}

		newChildConfig.draggable = true;
		newChildConfig.id = Ext.id();
		newChildConfig.text = "New" + type.toFirstUpperCase();
		newChildConfig.listeners = {
			"contextmenu": function(node, event)
			{
				var jsonTree = Ext.getCmp("JsonTree");
				var selectionModel = jsonTree.getSelectionModel();
				selectionModel.select( node );

				JsonTreeStatic.contextMenu.showAt(event.getXY());
				event.stopEvent();
			}
		};

		if ( parentNode.attributes.type == "array" && (selectedNode.attributes.type == "object" || selectedNode.attributes.type == "array") )
		{
			newChildConfig.text = "[object " + type.toFirstUpperCase() + "]";
		}

		var newChild = new Ext.tree.TreeNode( newChildConfig );

		parentNode.appendChild( newChild );

		if (parentNode.isExpandable() && !parentNode.isExpanded())
			parentNode.expand();

		selectionModel.select( newChild );
	},

	setTreePath: function (node) {
		var path = node.getPath("text");
		path = path.substr(1, path.length).split("/");
		var pathIds = node.getPath();
		pathIds = pathIds.substr(1, pathIds.length).split("/");

		var rowNr = null;
		var newStr = "";
		var count = 0;

		for (rowNr in path)
		{
			if (rowNr != "remove")
			{
				if (count == 0)
				{
					newStr += "/ ";
				}
				else if (node.id == pathIds[rowNr])
				{
					newStr += path[rowNr];
				}
				else
				{
					newStr += '<a href="#" class="tree-path-link" nodelinkid="' + pathIds[rowNr] + '">' + path[rowNr] + '</a> / ';
				}
				count++;
			}
		}

		JsonStatusbarFunctions.setPanelBody( newStr );

		Ext.get(Ext.query(".tree-path-link")).on("click", function(e, el, obj) {
			var jsonTree = Ext.getCmp("JsonTree");
			var selectNode = jsonTree.getNodeById( el.getAttribute("nodelinkid") );
			var selectionModel = jsonTree.getSelectionModel();

			selectionModel.select( selectNode );
		});
		
	},

	getDefaultRootNode: function ( rootType, children ) {
		var qTip = '';
		var isLeaf = true;
		var icoClass = '';
		var expanded = false;

		if ( rootType != null && rootType != "" && children != null )
		{
			qTip += '<div class=\'tree-qtip-cell-caption\'><b>Key:</b></div><b>ROOT</b><br style=\'clear: both;\'/>';
			qTip += '<div class=\'tree-qtip-cell-caption\'><b>Typ:</b></div>' + rootType;

			isLeaf = false;
			icoClass = "ico_" + rootType;
			expanded = true;
		}

		var rootNode = new Ext.tree.TreeNode({
			text: 'JSON',
			value: '|||JSON|ROOT|NODE|||',
			draggable:false,
			leaf: isLeaf,
			id:'JsonTree_RootNode',
			iconCls: icoClass,
			type: rootType,
			qtip: qTip,
			children: children,
			expanded: expanded,
			//@todo Der listener wird 3 mal mit gleichem code aufgerufen... nix gud. 2 andere Aufrufe in *.ui.jsonTree, und ein weitere in diesem File ein bisschen weiter unten
			listeners: {
				"contextmenu": function(node, event)
				{
					var jsonTree = Ext.getCmp("JsonTree");
					var selectionModel = jsonTree.getSelectionModel();
					selectionModel.select( node );

					JsonTreeStatic.contextMenu.showAt(event.getXY());
					event.stopEvent();
				}
			}
		});
		return rootNode;
	}
};

var JsonTreeStatic = {
	contextMenu: new Ext.menu.Menu({
		id: 'menu_tree_context',
		items: [{
			text: 'Add',
			menu: {
				items: [
				{
					text: 'Add Key',
					id: 'btn_menu_tree_context_add_key'
				},
				'-',
				{
					text: 'Add Object',
					id: 'btn_menu_tree_context_add_object'
				},
				{
					text: 'Add Array',
					id: 'btn_menu_tree_context_add_array'
				}
				]
			}
		}, '-',{
			text: 'Delete ',
			id: 'btn_menu_tree_context_delete'
		}]
	})
};

var JSONpad_JsonTree = {
	initHandler: function ( me ) {
		Ext.getCmp("btn_menu_tree_add_key").setHandler( JsonTreeFunctions.addKeyToTree );
		Ext.getCmp("btn_menu_tree_add_object").setHandler( JsonTreeFunctions.addObjectToTree );
		Ext.getCmp("btn_menu_tree_add_array").setHandler( JsonTreeFunctions.addArrayToTree );
		Ext.getCmp("btn_menu_tree_delete").setHandler( JsonTreeFunctions.deleteNode );

		Ext.getCmp("btn_menu_tree_context_add_key").setHandler( JsonTreeFunctions.addKeyToTree );
		Ext.getCmp("btn_menu_tree_context_add_object").setHandler( JsonTreeFunctions.addObjectToTree );
		Ext.getCmp("btn_menu_tree_context_add_array").setHandler( JsonTreeFunctions.addArrayToTree );
		Ext.getCmp("btn_menu_tree_context_delete").setHandler( JsonTreeFunctions.deleteNode );
	},

	initEvents: function ( me ) {
		Ext.getCmp("JsonTree").getSelectionModel().addListener("beforeselect", function (sel, n, o) {
			if (n.getDepth() == 0)
			{
				JsonEditFunctions.disableEditor(true, true);
			}
			else
			{
				if ( n.attributes.leaf == false ) {
					var parent = n.parentNode;

					JsonEditFunctions.disableEditor(false, true);
					
					if (parent.attributes.type == "array") {
						Ext.getCmp("JsonEdit_editObject_index").setValue("ARRAY VALUE");
						Ext.getCmp("JsonEdit_editObject_index").disable();
					} else {
						Ext.getCmp("JsonEdit_editObject_index").setValue( n.attributes.text );
						Ext.getCmp("JsonEdit_editObject_index").enable();
					}
				} else {
					JsonEditFunctions.disableEditor(true, false);

					Ext.getCmp("JsonEdit_editKey_key").setValue( n.attributes.text );
					Ext.getCmp("JsonEdit_editKey_value").setValue( n.attributes.value );
					Ext.getCmp("JsonEdit_editKey_isNull").setValue( ( n.attributes.type == "null" ));

					Ext.getCmp("JsonEdit_editKey_key").enable();
					if ( n.parentNode != null )
					{
						if (n.parentNode.attributes.type == "array")
						{
							Ext.getCmp("JsonEdit_editKey_key").disable();
						}
					}
				}
			}

			JsonTreeFunctions.setTreePath( n );
		});



		Ext.getCmp("JsonTree").addListener("enddrag", function (tree, node, event) {
			var parent = node.parentNode;

			if (parent.attributes.type == "array")
			{
				if (node.attributes.type == "array" || node.attributes.type == "object")
				{
					node.setText( "[object " + node.attributes.type.toFirstUpperCase() + "]" );
				}
				else
				{
					node.setText( node.attributes.value );
				}
			}

			node.select();
		});
	}
}