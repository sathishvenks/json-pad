JP.XmlWindow.xmlForm = Ext.extend(Ext.FormPanel, {
    layout: 'form',
    frame: false,
    hideLabel: true,
    ref: 'xmlForm',
    initComponent: function() {
	var me = this;

	this.tbar = {
	    items: [{
		xtype: 'buttongroup',
		title: '',
		columns: 2,
		ref: '../btnGroup_clipboard',
		items: [
		{
		    xtype: 'button',
		    iconCls: 'icon_copyJson',
		    scale: 'large',
		    ref: 'copy'
		},
		{
		    xtype: 'button',
		    iconCls: 'icon_pasteJson',
		    scale: 'large',
		    ref: 'paste'
		}
		]
	    },
	    {
		xtype: 'buttongroup',
		title: '',
		columns: 2,
		ref: '../btnGroup_others',
		items: [
		{
		    xtype: 'button',
		    iconCls: 'icon_highlight',
		    scale: 'large',
		    ref: 'switchHighlighting',
		    enableToggle: true,
		    pressed: true
		}
		]
	    }]
	};

	this.items = [{
	    xtype: 'ux-codemirror',
	    codeMirrorPath: 'js/extern/CodeMirror',
	    language: 'xml',
	    hideLabel: true,
	    anchor: '100% 100%',
	    name: 'xmlData',
	    ref: 'xmlInput',
	    onResizeCallBackFn: function (codeMirror) {
		//@todo Hier gibts sicher ne bessere Möglichkeit...Unterschied zum normalem Resizen ist das immer das Form elemente genommen werden muss
		var el = Ext.select('.'+codeMirror.id, true);
		var lineNumbersEl = Ext.select("."+codeMirror.id+" ~ div", true);

		var win = me;
		var width = win.getWidth();
		var height = win.getHeight();

		if (el){
		    if ( codeMirror.initialized && !codeMirror.codeMirrorHidden && lineNumbersEl && count(lineNumbersEl.elements) && width )
			width = width - lineNumbersEl.elements[0].getWidth();

		    for (var i=0; i< el.elements.length; i++)
		    {
			if (width && !height)
			    el.elements[i].setWidth(width);
			else if (!width && height)
			    el.elements[i].setHeight(height);
			else if (width && height)
			    el.elements[i].setSize(width-3, height-1);

			lineNumbersEl.elements[i].setHeight(height);
		    }
		}
	    },
	    initCallBackFn: function (me) {
		me.findParentByType("jp_xmlwindow").setWidth(me.findParentByType("jp_xmlwindow").getWidth()-1);
		JP.XmlWindow.Action.setXmlData();
	    }
	}];

	JP.XmlWindow.xmlForm.superclass.initComponent.call(this);

	this.btnGroup_clipboard.copy.setHandler( JP.XmlWindow.Action.tbar.copyXmlStringToClipboard, this );
	this.btnGroup_clipboard.paste.setHandler( JP.XmlWindow.Action.tbar.pasteXmlStringFromClipboard, this );

	this.btnGroup_others.switchHighlighting.on("toggle", JP.XmlWindow.Action.tbar.switchHighlighting, this);
    }
});

Ext.reg('jp_xmlwindow_xmlform', JP.XmlWindow.xmlForm);