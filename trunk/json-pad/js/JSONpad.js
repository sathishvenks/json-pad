console = {
	log: air.Introspector ? air.Introspector.Console.log : function(){}
};




Ext.BLANK_IMAGE_URL = 'js/extjs/resources/images/default/s.gif';

Ext.ns('JSONpad');

JSONpad = Ext.extend(JSONpadUi, {
	initHandler: function () {
		JSONpad_JsonStringForm.initHandler( this.jsonString );
		JSONpad_JsonTree.initHandler( this.jsonTree );
		JSONpad_JsonEdit.initHandler( this.jsonEdit );
	},

	initEvents: function () {
		JSONpad_JsonTree.initEvents( this.jsonTree )
		JSONpad_JsonEdit.initEvents( this.jsonEdit )
	},

    initComponent: function() {
        JSONpad.superclass.initComponent.call(this);
		this.initHandler( this );
		this.initEvents( this );
    }
});

// create application
JSONpad.app = function() {
	return {
		// public methods
		init: function() {
			var viewport = new JSONpad();
//Ext.MessageBox.alert("test", "message", null, this);
			//Ext.getCmp('JSONpad_StatusBar_bbar').setText("Blub?");

//jsonStringInputFrame.document.designMode="on";

//air.

		/*air.htmlloader.jsonStringInputFrame.document.open();
        jsonStringInputFrame.document.write("<html><head></head><body>asd</body></html>");
        jsonStringInputFrame.document.close();*/
			/*new Ext.ToolTip({
				target: 'btn_loadToTree',
				html: 'Load JSON string to the tree'
			});
			new Ext.ToolTip({
				target: 'btn_loadFromTree',
				html: 'Load JSON string from the tree'
			});
			new Ext.ToolTip({
				target: 'btn_copyJson',
				html: 'JSON in Zwischenablage kopieren'
			});
			new Ext.ToolTip({
				target: 'btn_pasteJson',
				html: 'Einfügen in JSON Feld'
			});
			new Ext.ToolTip({
				target: 'btn_jsonSamples',
				html: 'Einfügen eines JSON Beispiel-Strings'
			});*/

			Ext.QuickTips.init();
		}
	};
}();

Ext.onReady(JSONpad.app.init, JSONpad.app);

air.Introspector.Console.info();