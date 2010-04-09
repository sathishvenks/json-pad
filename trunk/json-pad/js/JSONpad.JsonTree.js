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
		var selectedId = null;

		if (selectedNode == null)
			selectedNode = jsonTree.getRootNode();


		//debug.dump(selectedNode.attributes, "selectedNode.attributes");
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
			newId = "1_";
		}
		else
		{
			selectedId = parentNode.attributes.id.split("_");
			var lvl = parseInt( selectedId[ selectedId.length - 1 ] );
			newId = lvl + "_";
		}

		newId += ""+(count+1);

		

		var newChildConfig = null;
		switch (type)
		{
			case 'key':
				newChildConfig = {
					leaf: true,
					draggable: true,
					expandable: false,
					value: "",
					type: "string"
				};
				break;
			case 'object': case 'array':
				newChildConfig = {
					leaf: false,
					draggable: false,
					expandable: true,
					//children: [],
					type: type.toLowerCase(),
					iconCls: "ico_" + type.toLowerCase()
				};
				break;
		}

		newChildConfig.id = newId;
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

		var newChild = new Ext.tree.TreeNode( newChildConfig );

		parentNode.appendChild( newChild );

		if (parentNode.isExpandable() && !parentNode.isExpanded())
			parentNode.expand();

		selectionModel.select( newChild );
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
					JsonEditFunctions.disableEditor(false, true);

					Ext.getCmp("JsonEdit_editObject_index").setValue( n.attributes.text );
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
		});



		Ext.getCmp("JsonTree").addListener("enddrag", function (tree, node, event) {
			var parent = node.parentNode;

			if (parent.attributes.type == "array")
			{
				node.setText( node.attributes.value );
			}

			node.select();
		});
	}
}