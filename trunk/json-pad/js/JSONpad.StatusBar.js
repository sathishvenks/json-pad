var JsonStatusbarFunctions = {
	addStatusBarTooltip: function (text) {
		var sb = Ext.getCmp('JSONpad_StatusBar_bbar');
		sb.setStatus({
			text: text,
			clear: false
		});
	},

	clear: function () {
		var sb = Ext.getCmp('JSONpad_StatusBar_bbar');
		sb.clearStatus();
	},

	setPanelBody: function (txt) {
		Ext.get(Ext.query("div.status-bar div.x-panel-body")[0]).update(txt);
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

var JSONpad_StatusBar = {
	initHandler: function ( me ) {

	},

	initEvents: function ( me ) {
		Ext.getCmp("JSONpad_StatusBar").on("afterrender", function (cmp) {
			JsonTreeFunctions.setTreePath( Ext.getCmp("JsonTree").getRootNode() );
		});
	}
}