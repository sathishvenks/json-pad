JP.MainBottom = Ext.extend(Ext.Panel, {
    title: '',
    region: 'south',
    //id: 'JPsouth',
    initComponent: function() {
	this.bbar = {
	    xtype: 'statusbar',
	    id: 'JPmainStatusBar',
	    ref: 'jpstatus',
	    statusAlign: 'left',
	    defaultText: '',
	    text: '',
	    iconCls: '',
	    items: [
	    ' ',
	    {
		xtype: 'tbtext',
		text: 'Text Item'
	    }
	    ]
	};
	JP.MainBottom.superclass.initComponent.call(this);
    }
});

Ext.reg('jp_main_bottom', JP.MainBottom);