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
	JSONpad_StatusBar.initHandler( this.jsonEdit );
    },

    initEvents: function () {
	JSONpad_JsonStringForm.initEvents( this.jsonString );
	JSONpad_JsonTree.initEvents( this.jsonTree );
	JSONpad_JsonEdit.initEvents( this.jsonEdit );
	JSONpad_StatusBar.initEvents( null );
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

	    Ext.QuickTips.init();
	}
    };
}();

Ext.onReady(JSONpad.app.init, JSONpad.app);

air.Introspector.Console.info();

JSONpadAir.init();