JP.MainCenter.jsonTree = Ext.extend(Ext.tree.TreePanel, {
    title: '',
    region: 'west',
    split: true,
    width: 300,
    border: true,
    //activeTab: 0,
    //id: 'JPsouth',
    initComponent: function() {
	this.tbar = {
	    xtype: 'toolbar',
	    id: 'JPjsonTreeToolbar',
	    ref: 'tools',
	    items: [
	    {
		xtype: 'button',
		text: 'A',
		id: 'treeToolbarBtnAdd',
		menu: {
		    xtype: 'menu',
		    id: 'treeToolbarAddMenu',
		    items: [
		    {
			xtype: 'menuitem',
			text: 'Add key',
			ref: '../../../add_key'
		    },
		    {
			xtype: 'tbseparator'
		    },
		    {
			xtype: 'menuitem',
			text: 'Add object',
			ref: '../../../add_object'
		    },
		    {
			xtype: 'menuitem',
			text: 'Add array',
			ref: '../../../add_array'
		    }
		    ]
		}
	    },
	    {
		xtype: 'button',
		text: 'D',
		id: 'treeToolbarBtnDuplicate',
		ref: '../btn_duplicateNode'
	    },
	    {
		xtype: 'button',
		text: 'D',
		id: 'treeToolbarBtnDelete',
		ref: '../btn_deleteNode'
	    }
	    ]
	};

	this.root = {
	    text: 'JSON',
	    leaf: true,
	    ref: 'rnode'
	};

	JP.MainCenter.jsonTree.superclass.initComponent.call(this);
    }
});

Ext.reg('jp_main_center_jsonTree', JP.MainCenter.jsonTree);