Ext.namespace('Ext.ux.form');

Ext.ux.form.CodeMirror = Ext.extend(Ext.form.TextArea, {
    language: 'txt',
    codeMirrorHidden: false,
    codeMirrorPath: null, // should be path to code mirror on your server!
    initCallBackFn: null,
    resizeCallBackFn: null,
    initComponent: function() {
	if (this.codeMirrorPath === null) {
	    throw 'Ext.ux.form.CodeMirror: codeMirrorPath required';
	}
	this.initialized = false;
	Ext.ux.form.CodeMirror.superclass.initComponent.apply(this, arguments);
	this.addEvents('initialize');
	this.on({
	    resize: function(ta, width, height) {
		if (this.resizeCallBackFn)
		    this.resizeCallBackFn(this);
		else {
		    var el = Ext.select('.'+this.id, true);
		    var lineNumbersEl = Ext.select("."+this.id+" ~ div", true);

		    if (!width)
			width = ta.getWidth();
		    if (!height)
			height = ta.getHeight();

		    if (el){
			if ( this.initialized && !this.codeMirrorHidden && lineNumbersEl && count(lineNumbersEl.elements) && width )
			    width = width - lineNumbersEl.elements[0].getWidth();


			for (var i=0; i< el.elements.length; i++)
			{
			    if (width && !height)
				el.elements[i].setWidth(width);
			    else if (!width && height)
				el.elements[i].setHeight(height);
			    else if (width && height)
				el.elements[i].setSize(width, height);

			    lineNumbersEl.elements[i].setHeight(height);
			}
		    }
		}
	    },
	    afterrender: function() {
		var parser, stylesheet;
		switch (this.language.toLowerCase()) {
		    case 'json':
			parser = ['tokenizejson.js', 'parsejson.js'];
			stylesheet = this.codeMirrorPath+'/css/jsoncolors.css';
			break;
		    case 'css':
			parser = 'parsecss.js';
			stylesheet = this.codeMirrorPath+'/css/csscolors.css';
			break;
		    case 'js':
			parser = ['tokenizejavascript.js', 'parsejavascript.js'];
			stylesheet = this.codeMirrorPath+'/css/jscolors.css';
			break;
		    case 'php':
			parser = [
			"parsexml.js",
			"parsecss.js",
			"tokenizejavascript.js",
			"parsejavascript.js",
			"../contrib/php/js/tokenizephp.js",
			"../contrib/php/js/parsephp.js",
			"../contrib/php/js/parsephphtmlmixed.js"
			];
			stylesheet = [
			this.codeMirrorPath+'/css/xmlcolors.css',
			this.codeMirrorPath+'/css/jscolors.css',
			this.codeMirrorPath+'/css/csscolors.css',
			this.codeMirrorPath+'/contrib/php/css/phpcolors.css'
			];
			break;
		    case 'htm':
		    case 'html':
		    case 'xml':
			parser = 'parsexml.js';
			stylesheet = 'xmlcolors.css';
			break;
		    default:
			parser = 'parsedummy.js';
			stylesheet = '';
			break;

		}
		var me = this;
		(function() {
		    me.codeEditor = new CodeMirror.fromTextArea(me.id, {
			parserfile: parser,
			stylesheet: stylesheet,
			path: me.codeMirrorPath+'/js/',
			textWrapping: true,
			autoMatchParens: true,
			lineNumbers: true,
			//continuousScanning: true,
			passDelay: 100,
			passTime: 50,
			lineNumberDelay: 1000,
			lineNumberTime: 50,
			iframeClass: 'codemirror-iframe '+me.id,
			content: this.value,
			parserConfig: {
			    json: true
			},
			lang: me.language.toLowerCase(),
			initCallback: function() {
			    me.initialized = true;
			    me.fireEvent('initialize', true);

			    if (me.initCallBackFn != null)
				me.initCallBackFn(me);
			}
		    });
		}).defer(100);
	    }
	});
    },
    getValue: function() {
	if (this.initialized) {
	    if ( this.codeMirrorHidden )
		return this.getTextareaValue();
	    else
		return this.codeEditor.getCode();
	}
	return this.value;
    },
    setValue: function(v) {
	if (this.initialized) {

	    if (this.codeMirrorHidden)
		this.setTextareaValue(v)
	    else
		this.codeEditor.setCode(v);
	}
    },
    getTextareaValue : function(){
	if(!this.rendered) {
	    return this.value;
	}
	var v = this.el.getValue();
	if(v === this.emptyText || v === undefined){
	    v = '';
	}
	return v;
    },
    setTextareaValue : function(v){
	if(this.emptyText && this.el && !Ext.isEmpty(v)){
	    this.el.removeClass(this.emptyClass);
	}
	Ext.form.TextField.superclass.setValue.apply(this, arguments);
	this.applyEmptyText();
	this.autoSize();
	return this;
    },
    hideCodeMirror: function () {
	var me = this;
	var iframeEl = Ext.select('.'+this.id, true);
	var textareaEl = Ext.select("textarea#" + me.id, true);
		
	textareaEl.setVisibilityMode(Ext.Element.DISPLAY);
	iframeEl.setVisibilityMode(Ext.Element.DISPLAY);

	me.setTextareaValue( me.getValue() );

	iframeEl.setVisible(false);
	textareaEl.setVisible(true);

	me.codeMirrorHidden = true;
    },
    showCodeMirror: function () {
	var me = this;
	var iframeEl = Ext.select('.'+this.id, true);
	var textareaEl = Ext.select("textarea#" + me.id, true);

	textareaEl.setVisibilityMode(Ext.Element.DISPLAY);
	iframeEl.setVisibilityMode(Ext.Element.DISPLAY);	

	textareaEl.setVisible(false);
	iframeEl.setVisible(true);

	me.codeMirrorHidden = false;

	me.setValue( this.getTextareaValue() );
	me.setTextareaValue( '' );
    },
    validate: function() {
	this.getValue();
	Ext.ux.form.CodeMirror.superclass.validate.apply(this, arguments);
    }
});
Ext.reg('ux-codemirror', Ext.ux.form.CodeMirror);