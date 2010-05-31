JP.MainCenter.jsonTree = Ext.extend(Ext.tree.TreePanel, {
    title: '',
    region: 'west',
    split: true,
    width: 300,
    border: true,
    enableDD: true,
    autoScroll: true,
    ddGroup: 'nodeDragAndDrop',
    treeContextMenu: null,
    //activeTab: 0,
    //id: 'JPsouth',
    initComponent: function() {
	var sm = this.getSelectionModel();
	var me = this;

	this.plugins = [new NodeMouseoverPlugin(), new NodeMouseoutPlugin()];

	this.tbar = {
	    xtype: 'jp_main_center_jsonTree_toolbar'
	};

	this.root = {
	    text: 'JSON',
	    draggable: false,
	    leaf: true,
	    ref:'rnode',
	    type: 'object'
	};

	JP.MainCenter.jsonTree.superclass.initComponent.call(this);

	me.addListener("afterRender", function (tree) {
	    var topBar = this.getTopToolbar();
	    var btnDelete = topBar.deleteNode;
	    var btnDuplicate = topBar.duplicateNode;

	    me.treeContextMenu = new JP.MainCenter.jsonTree.contextMenu();

	    new Ext.dd.DropTarget(btnDelete.el, {
		available: true,
		ddGroup: 'nodeDragAndDrop',
		copy: false,
		notifyDrop: function(dd, e, data) {
		    (function() {
			JP.MainCenter.Action.tree.deleteNode();
		    //JsonTreeFunctions.deleteNode();
		    }).defer(50);
		    return true;
		}
	    });

	    new Ext.dd.DropTarget(btnDuplicate.el, {
		available: true,
		ddGroup: 'nodeDragAndDrop',
		copy: false,
		notifyDrop: function(dd, e, data) {
		    (function() {
			JP.MainCenter.Action.tree.duplicateNode();
		    }).defer(50);
		    return true;
		}
	    });
	}, me);

	me.addListener("mouseover", function(node) {
	    if (node.getDepth() > 0) {
		var value = node.attributes.value;

		if (node.attributes.type == "array" || node.attributes.type == "object")
		    value = "<i>&lt;" + node.attributes.type.toFirstUpperCase() + "&gt;</i>";

		JP.util.setJPStatus({
		    text: "<b>" + node.attributes.text + ":</b>  " + value
		}, 'right');
	    } else {
		JP.util.clearJPStatus("right");
	    }
	});

	me.addListener("mouseout", function(node) {
	    JP.util.clearJPStatus("right");
	});

	me.addListener("contextmenu", function(node, event) {
	    var selectionModel = me.getSelectionModel();
	    selectionModel.select( node );

	    me.treeContextMenu.showAt(event.getXY());
	    event.stopEvent();
	}, me);

	//me.addListener("append", function (tree, parent, node, ind) {
	    //if (ind == 0) node.select();
	//});

	sm.addListener("beforeselect", function (sel, n, o) {
	    debug.trace("blub2");
	    var editKeyForm = this.findParentByType("viewport").findByType("jp_main_center_ediTreeForm_tabs_edit")[0];
	    var topBar = this.getTopToolbar();


	    if (editKeyForm.formUnsaved) {
		editKeyForm.confirmUnsaved(n);
		return false;
	    }

	    if (n.getDepth() == 0) {
		editKeyForm.disable();
		topBar.duplicateNode.disable();
		topBar.deleteNode.disable();
		this.treeContextMenu.duplicateNode.disable();
		this.treeContextMenu.deleteNode.disable();
	    } else {
		topBar.duplicateNode.enable();
		topBar.deleteNode.enable();
		this.treeContextMenu.duplicateNode.enable();
		this.treeContextMenu.deleteNode.enable();

		if ( n.attributes.leaf == true ) {
		    editKeyForm.keyForm.jsonkey.setValue( n.attributes.text );
		    editKeyForm.keyForm.jsonvalue.setValue( n.attributes.value );
		    editKeyForm.keyForm.isnull.setValue( ( n.attributes.type == "null" ) );

		    if ( n.parentNode != null && n.parentNode.attributes.type == "array" )
			editKeyForm.keyForm.jsonkey.disable();
		    else
			editKeyForm.keyForm.jsonkey.enable();

		    if ( n.attributes.type == "null" )
			editKeyForm.keyForm.jsonvalue.disable();
		    else
			editKeyForm.keyForm.jsonvalue.enable();

		    editKeyForm.enableKeyForm();
		} else {
		    editKeyForm.enableObjectForm();

		    editKeyForm.objectForm.jsonIndex.setValue( n.attributes.text );
		}
	    }

	    JP.MainCenter.Action.tree.setTreePath( n, this );

	    return true;
	}, me);
    }
});

Ext.reg('jp_main_center_jsonTree', JP.MainCenter.jsonTree);