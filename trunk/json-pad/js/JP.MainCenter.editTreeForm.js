JP.MainCenter.ediTreeForm = Ext.extend(Ext.TabPanel, {
    activeTab: 0,
    region: 'center',
    resizeTabs: true,
    //id: 'JPeditTabs',
    initComponent: function() {
	this.items = [
	{
	    xtype: 'jp_main_center_ediTreeForm_editKey'
	}
	];

	JP.MainCenter.ediTreeForm.superclass.initComponent.call(this);
    }
});

Ext.reg('jp_main_center_ediTreeForm', JP.MainCenter.ediTreeForm);