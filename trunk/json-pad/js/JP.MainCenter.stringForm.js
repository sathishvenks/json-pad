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
	    initCallBackFn: function () {
		me.setWidth(me.getWidth()-1); //@todo Little bug in codemirror... this line helps at the moment
	    }
	}
	];

	this.bbar = {
	    xtype: 'statusbar',
	    //ref: 'jp_codemirror_status',
	    id: 'JPstringInputStatusBar',
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

	JP.MainCenter.stringForm.superclass.initComponent.call(this);

	
    }
});

Ext.reg('jp_main_center_stringForm', JP.MainCenter.stringForm);