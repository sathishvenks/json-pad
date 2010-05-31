JP.MainCenter.Action = {};

JP.MainCenter.Action.tree = {
    addKeyNode: function () {
	JP.MainCenter.Action.tree.addNode('key', this);
    },
    addObjectNode: function () {
	JP.MainCenter.Action.tree.addNode('object', this);
    },
    addArrayNode: function () {
	JP.MainCenter.Action.tree.addNode('array', this);
    },
    addNode: function (nodeType, tree) {
	var sm = tree.getSelectionModel();
	var selectedNode = sm.getSelectedNode();
	var parentNode = null;

	if (selectedNode == null) selectedNode = tree.getRootNode();

	if ( selectedNode.attributes.type == "object" || selectedNode.attributes.type == "array" )
	    parentNode = selectedNode;
	else
	    parentNode = selectedNode.parentNode;

	if ( !parentNode.hasChildNodes() && parentNode.getDepth() == 0 ) {
	    var root = JP.util.getJsonTreeDefaultRootNode( "object", [] );

	    tree.setRootNode(root);
	    tree.getLoader().load( tree.root );

	    parentNode = tree.getRootNode();
	}

	var newChildConfig = null;
	switch (nodeType) {
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
		    type: nodeType.toLowerCase(),
		    iconCls: "ico_" + nodeType.toLowerCase()
		};
		break;
	}

	newChildConfig.id = Ext.id();

	if ( parentNode.attributes.type == "array" && (nodeType == "object" || nodeType == "array") ) {
	    newChildConfig.text = "[object " + nodeType.toFirstUpperCase() + "]";
	} else {
	    newChildConfig.text = "New" + nodeType.toFirstUpperCase();
	}

	var newNode = new Ext.tree.TreeNode( newChildConfig );

	parentNode.insertBefore(newNode, selectedNode.nextSibling);

	if (parentNode.isExpandable() && !parentNode.isExpanded())
	    parentNode.expand();

	sm.select( newNode );
    },
    duplicateNode: function () {
	var tree = Ext.getCmp("JPviewPort").findByType("jp_main_center_jsonTree")[0];
	var sm = tree.getSelectionModel();
	var selectedNode = sm.getSelectedNode();
	var parentNode = selectedNode.parentNode;

	if ( selectedNode != null ) {
	    if ( selectedNode.getDepth() != 0 ) {
		var duplicateTreeObj = function (node, obj) {
		    node.eachChild(function (child) {
			var newChild = new Object();
			newChild.id = Ext.id();

			if (child.hasChildNodes()) {
			    newChild.iconCls = child.attributes.iconCls;
			    newChild.expandable = true;
			    newChild.leaf = false;
			    newChild.children = duplicateTreeObj(child, []);
			} else {
			    newChild.expandable = false;
			    newChild.leaf = true;
			    newChild.value = child.attributes.value;
			}

			newChild.text = child.attributes.text;
			newChild.type = child.attributes.type;

			obj.push(newChild);
		    });

		    return obj;
		};


		var newNode = new Ext.tree.TreeNode();

		if (selectedNode.hasChildNodes()) {
		    var children = duplicateTreeObj(selectedNode, []);
		    newNode.appendChild(children);
		} else {
		    newNode.attributes.value = selectedNode.attributes.value;
		}

		newNode.setId(Ext.id());
		newNode.attributes.iconCls = selectedNode.attributes.iconCls;
		newNode.attributes.expandable = selectedNode.attributes.expandable;
		newNode.attributes.leaf = selectedNode.attributes.leaf;
		newNode.setText(selectedNode.attributes.text + ' Copy');
		newNode.attributes.type = selectedNode.attributes.type;

		parentNode.insertBefore(newNode, selectedNode.nextSibling);
		sm.select(newNode);
	    }
	}
    },
    deleteNode: function () {
	var tree = Ext.getCmp("JPviewPort").findByType("jp_main_center_jsonTree")[0];
	var sm = tree.getSelectionModel();
	var selectedNode = sm.getSelectedNode();
	var previousSibling = selectedNode.previousSibling;
	var parentNode = selectedNode.parentNode;

	if ( selectedNode ) {
	    if ( selectedNode.getDepth() != 0 ) {
		selectedNode.remove();
	    }
	}

	if ( previousSibling )
	    sm.select( previousSibling );
	else
	    sm.select( parentNode );
    },
    setTreePath: function (node, tree) {
	var treePath = node.getPath("text");
	treePath = treePath.substr(1, treePath.length).split("/");

	var treePathIds = node.getPath("id");
	treePathIds = treePathIds.substr(1, treePathIds.length).split("/");

	var rowNr = null;
	var pathStr = "";
	var count = 0;

	for (rowNr in treePath) {
	    if (rowNr != "remove" && rowNr != "in_array") {
		if (count == 0)	{
		    pathStr += "/ ";
		} else if (node.id == treePathIds[rowNr]) {
		    pathStr += treePath[rowNr];
		} else {
		    pathStr += '<a href="#" class="tree-path-link" nodelinkid="' + treePathIds[rowNr] + '">' + treePath[rowNr] + '</a> / ';
		}
		count++;
	    }
	}

	var mainBottom = tree.findParentByType("viewport").findByType("jp_main_bottom")[0];
	mainBottom.updateContent( pathStr );

	Ext.get(Ext.query(".tree-path-link")).on("click", function(e, el, obj) {
	    var tree = this;
	    var selectNode = tree.getNodeById( el.getAttribute("nodelinkid") );
	    var selectionModel = tree.getSelectionModel();

	    selectionModel.select( selectNode );
	}, tree);
    }
};