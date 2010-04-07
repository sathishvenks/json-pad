var JSONpadUi_StatusBar = {
	xtype: 'panel',
	title: '',
	layout: 'fit',
	region: 'south',
	id: 'JSONpad_StatusBar',
	border: false,
	bbar: {
		xtype: 'statusbar',
		id: 'JSONpad_StatusBar_bbar',

		// defaults to use when the status is cleared:
		defaultText: '',
		//defaultIconCls: 'default-icon',

		// values to set initially:
		text: '',
		iconCls: '',

		// any standard Toolbar items:
		items: [
		/*{
			text: 'Show Warning & Clear',
			handler: function (){
				var sb = Ext.getCmp('JSONpad_StatusBar_bbar');
				sb.setStatus({
					text: 'Oops!',
					iconCls: 'x-status-error',
					clear: true // auto-clear after a set interval
				});
			}
		},*/
		/*{
			text: 'Show Busy',
			handler: function (){
				var sb = Ext.getCmp('basic-statusbar');
				// Set the status bar to show that something is processing:
				sb.showBusy("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bitte warten");
			}
		},
		{
			text: 'Clear status',
			handler: function (){
				var sb = Ext.getCmp('basic-statusbar');
				// once completed
				sb.clearStatus();
			}
		},
		'-',
		'Plain Text'*/
		]
	}
}