var JsonStatusbarFunctions = {
	addStatusBarTooltip: function (text) {
		var sb = Ext.getCmp('JSONpad_StatusBar_bbar');
		sb.setStatus({
			text: text,
			clear: false
		});
	}
};

var setStatusbarStatus = function (text, action, clear) {
	var sb = Ext.getCmp('JSONpad_StatusBar_bbar');
	sb.setStatus({
		text: text,
		iconCls: 'x-status-' + action,
		clear: clear
	});
};

var setStatusbarBusy = function (showBusy) {
	var sb = Ext.getCmp('JSONpad_StatusBar_bbar');
	if (showBusy)
		sb.showBusy();
	else
		sb.clearStatus({
			useDefaults:true
		})
}