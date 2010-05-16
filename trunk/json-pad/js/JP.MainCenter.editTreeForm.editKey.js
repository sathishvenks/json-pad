JP.MainCenter.ediTreeForm.editKey = Ext.extend(Ext.FormPanel, {
    title: 'Edit Key',
    layout: 'form',
    frame: true,
    border: false,
    initComponent: function() {
	this.items = [
	{
	    xtype: 'textarea',
	    fieldLabel: 'Key',
	    anchor: '100%',
	    name: 'jsonKey',
	    id: 'editTabsEditKeyFormJsonKey',
	    ref: '../../jsonKey'
	},
	{
	    xtype: 'textarea',
	    fieldLabel: 'Value',
	    anchor: '100%',
	    name: 'jsonValue',
	    id: 'editTabsEditKeyFormJsonValue',
	    ref: '../../jsonValue'
	},
	{
	    xtype: 'checkbox',
	    fieldLabel: 'isNull',
	    anchor: '100%',
	    name: 'isNull',
	    id: 'editTabsEditKeyFormIsNull',
	    ref: '../../is_null'
	}
	];

	JP.MainCenter.ediTreeForm.editKey.superclass.initComponent.call(this);
    }
});

Ext.reg('jp_main_center_ediTreeForm_editKey', JP.MainCenter.ediTreeForm.editKey);