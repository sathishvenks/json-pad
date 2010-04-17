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

	duplicateNode: function () {
		var jsonTree = Ext.getCmp("JsonTree");
		var selectionModel = jsonTree.getSelectionModel();
		var selectedNode = selectionModel.getSelectedNode();
		var parentNode = selectedNode.parentNode;

		if ( selectedNode != null )
		{
			if ( selectedNode.getDepth() != 0 )
			{
				var newNode = new Ext.tree.TreeNode();

				if (selectedNode.hasChildNodes())
				{
					var children = copyTreeNode(selectedNode, []);
					newNode.appendChild(children);
				}
				else
				{
					newNode.attributes.value = selectedNode.attributes.value;
				}
				newNode.setId(Ext.id());
				newNode.attributes.iconCls = selectedNode.attributes.iconCls;
				newNode.attributes.expandable = selectedNode.attributes.expandable;
				newNode.attributes.draggable = selectedNode.attributes.draggable;
				newNode.attributes.leaf = selectedNode.attributes.leaf;
				newNode.setText(selectedNode.attributes.text + ' Copy');
				newNode.attributes.type = selectedNode.attributes.type;
	
				
				parentNode.appendChild(newNode);
				selectionModel.select(newNode);
			}
		}

		JsonTreeFunctions.setTreePath( selectionModel.getSelectedNode() );
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
		var pathIds = node.getPath("id");

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
		var isLeaf = true;
		var icoClass = '';
		var expanded = false;

		if ( rootType != null && rootType != "" && children != null )
		{
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
			children: children,
			expanded: expanded
		});
		return rootNode;
	}
};


var copyTreeNode = function (node, obj) {
	node.eachChild(function (child) {
		var newChild = new Object();
		newChild.id = Ext.id();

		if (child.hasChildNodes())
		{
			newChild.iconCls = child.attributes.iconCls;
			newChild.expandable = true;
			newChild.draggable = true;
			newChild.leaf = false;
			newChild.children = copyTreeNode(child, []);
		}
		else
		{
			newChild.expandable = false;
			newChild.draggable = true;
			newChild.leaf = true;
			newChild.value = child.attributes.value;
		}

		newChild.text = child.attributes.text;
		newChild.type = child.attributes.type;

		obj.push(newChild);
	});

	return obj;
}


var setNewNodeIds = function (node) {
	node.eachChild(function (child) {
		if ( child.hasChildNodes() )
		{
			setNewNodeIds(child);
		}

		child.id = Ext.id();
	});

	debug.dump(node, "node");

	return node;
}

var JsonTreeStatic = {
	contextMenu: new Ext.menu.Menu({
		id: 'menu_tree_context',
		items: [{
			text: 'Add',
			iconCls: 'icon_tree_addKey',
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
		},{
			text: 'Duplicate',
			iconCls: 'icon_tree_duplicate',
			id: 'btn_menu_tree_context_duplicate'
		}, '-',{
			text: 'Delete',
			iconCls: 'icon_tree_delete',
			id: 'btn_menu_tree_context_delete'
		}]
	})
};

var JSONpad_JsonTree = {
	initHandler: function ( me ) {
		Ext.getCmp("btn_menu_tree_add_key").setHandler( JsonTreeFunctions.addKeyToTree );
		Ext.getCmp("btn_menu_tree_add_object").setHandler( JsonTreeFunctions.addObjectToTree );
		Ext.getCmp("btn_menu_tree_add_array").setHandler( JsonTreeFunctions.addArrayToTree );
		Ext.getCmp("btn_menu_tree_duplicate").setHandler( JsonTreeFunctions.duplicateNode );
		Ext.getCmp("btn_menu_tree_delete").setHandler( JsonTreeFunctions.deleteNode );

		Ext.getCmp("btn_menu_tree_context_add_key").setHandler( JsonTreeFunctions.addKeyToTree );
		Ext.getCmp("btn_menu_tree_context_add_object").setHandler( JsonTreeFunctions.addObjectToTree );
		Ext.getCmp("btn_menu_tree_context_add_array").setHandler( JsonTreeFunctions.addArrayToTree );
		Ext.getCmp("btn_menu_tree_context_duplicate").setHandler( JsonTreeFunctions.duplicateNode );
		Ext.getCmp("btn_menu_tree_context_delete").setHandler( JsonTreeFunctions.deleteNode );
	},

	initEvents: function ( me ) {
		Ext.getCmp("JsonTree").getSelectionModel().addListener("beforeselect", function (sel, n, o) {
			if (!JsonEditFunctions.savedKeyForm || !JsonEditFunctions.savedObjectForm)
			{
				Ext.MessageBox.confirm("Save before loading", "Your data is unsaved. Save before changing the node?", function (button) {
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
					}

					var jsonTree = Ext.getCmp("JsonTree");
					var selectionModel = jsonTree.getSelectionModel();

					selectionModel.select(n);
				});

				return false;
			}

			if (n.getDepth() == 0)
			{
				Ext.getCmp("btn_menu_tree_context_delete").disable();
				Ext.getCmp("btn_menu_tree_delete").disable();
				Ext.getCmp("btn_menu_tree_context_duplicate").disable();
				Ext.getCmp("btn_menu_tree_duplicate").disable();

				JsonEditFunctions.disableEditor(true, true);
			}
			else
			{
				Ext.getCmp("btn_menu_tree_context_delete").enable();
				Ext.getCmp("btn_menu_tree_delete").enable();
				Ext.getCmp("btn_menu_tree_context_duplicate").enable();
				Ext.getCmp("btn_menu_tree_duplicate").enable();

				if ( n.attributes.leaf == false ) {
					var parent = n.parentNode;

					JsonEditFunctions.disableEditor(true, false);
					
					if (parent.attributes.type == "array") {
						Ext.getCmp("JsonEdit_editObject_index").setValue("ARRAY VALUE");
						Ext.getCmp("JsonEdit_editObject_index").disable();
					} else {
						Ext.getCmp("JsonEdit_editObject_index").setValue( n.attributes.text );
						Ext.getCmp("JsonEdit_editObject_index").enable();
					}
				} else {
					JsonEditFunctions.disableEditor(false, true);

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

		Ext.getCmp("JsonTree").addListener("contextmenu", function(node, event) {
			var jsonTree = Ext.getCmp("JsonTree");
			var selectionModel = jsonTree.getSelectionModel();
			selectionModel.select( node );

			JsonTreeStatic.contextMenu.showAt(event.getXY());
			event.stopEvent();
		});

		Ext.getCmp("JsonTree").addListener("mouseover", function(node) {
			if (node.getDepth() > 0)
			{
				var value = node.attributes.value;

				if (node.attributes.type == "array" || node.attributes.type == "object")
					value = "<i>&lt;" + node.attributes.type.toFirstUpperCase() + "&gt;</i>";

				JsonStatusbarFunctions.addStatusBarTooltipRight("<b>" + node.attributes.text + ":</b>  " + value);
			}
		});

		Ext.getCmp("JsonTree").addListener("mouseout", function(node) {
			if (node.getDepth() > 0)
				JsonStatusbarFunctions.clearRight();
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