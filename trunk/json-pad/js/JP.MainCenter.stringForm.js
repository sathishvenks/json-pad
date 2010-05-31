JP.MainCenter.stringForm = Ext.extend(Ext.FormPanel, {
    title: '',
    region: 'north',
    layout: 'fit',
    split: true,
    height: 200,
    id: 'JPsouth',
    initComponent: function() {
	var me = this;

	this.items = [
	{
	    xtype: 'ux-codemirror',
	    codeMirrorPath: 'js/extern/CodeMirror',
	    language: 'js',
	    hideLabel: true,
	    name: 'jsonString',
	    initCallBackFn: function (cm) {
		me.setWidth(me.getWidth()-1); //@todo Little bug in codemirror... this line helps at the moment

		if (JSONpadAir.settings.syntax_hl == "false") {
		    Ext.getCmp("JPviewPort").findByType("jp_main_top")[0].getTopToolbar().findByType("jp_main_top_iconbar")[0].btnGroup_others.switchHighlighting.toggle(false, true);
		    cm.hideCodeMirror();
		}
	    }
	}
	];

	this.bbar = {
	    xtype: 'statusbar',
	    id: 'JPstringInputStatusBar', //@todo maybe without ids...
	    statusAlign: 'left',
	    defaultText: '',
	    text: '',
	    iconCls: ''
	};

	JP.MainCenter.stringForm.superclass.initComponent.call(this);

	
    }
});

Ext.reg('jp_main_center_stringForm', JP.MainCenter.stringForm);