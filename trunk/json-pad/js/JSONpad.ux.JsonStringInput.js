var JsonStringInput = Ext.extend(Ext.form.TextArea,  {
	rendered: false,

	//wrap: null,

	initComponent : function(){
		Ext.apply(this, {});

		this.addEvents("changed");

		this.on ("changed", function (control, value)
		{
			if (this.rendered) {
				Ext.get("jsonStringInputFrame").update (value);
			}
			else
			{
				debug.trace ("changed but not rendered");
			}
		});
		

		this.on("resize", function (textarea, width, height) {
			Ext.get("jsonStringInputFrame").setWidth(width);
			Ext.get("jsonStringInputFrame").setHeight(height);
		}, this);
	   
		JsonStringInput.superclass.initComponent.apply (this, arguments);
	},

	// private
	initEvents : function(){
		JsonStringInput.superclass.initEvents.call(this);
	},

	markInvalid : Ext.emptyFn,

	clearInvalid : Ext.emptyFn,

	// private
	onRender : function(ct, position){
		JsonStringInput.superclass.onRender.call(this, ct, position);

		this.el.setVisible(false);

		this.wrap = this.el.wrap ({
			tag: 'div',
			cls: 'json-string-input-content',
			html: '<p id="jsonStringInputFrame" tabindex="0" contentEditable="true"></p>'
		});

		var editableContainer = Ext.get("jsonStringInputFrame");
		var editableContainerDom = Ext.query("#jsonStringInputFrame");

		
		/*editableContainer.on("keypress", function (e, el, o) {
			debug.trace("--KEYPRESS--");
			debug.trace(e.getCharCode());
			debug.trace(el.innerHTML());
		});*/

		

		editableContainer.on("keyup", function (e, el, o) {
			var charCode = parseInt(e.getCharCode());
			var elHtml = el.innerHTML;
			var stringWithoutLastSign = "";

			
			// {

			debug.trace("--"+charCode+"--");
			if ( charCode == 219 )
			{

				if (elHtml.length > 0)
				{
					debug.trace("-"+elHtml.length+"-");
					stringWithoutLastSign = elHtml.substring( 0, elHtml.length-1 );
				}
				debug.trace("++"+stringWithoutLastSign+"++");
				elHtml = stringWithoutLastSign + '<span style="color: blue;">{</span>';
				debug.trace(elHtml);
			}

			if ( charCode == 221 )
			{

				if (elHtml > 0)
				{
					debug.trace("-"+elHtml.length+"-");
					stringWithoutLastSign = elHtml.substring( elHtml.length-1, elHtml.length );
				}
				elHtml = stringWithoutLastSign + '<span style="color: blue;">}</span>';
			}

			if ( charCode == 58 )
			{

				if (elHtml > 0)
				{
					debug.trace("-"+elHtml.length+"-");
					stringWithoutLastSign = elHtml.substring( elHtml.length-1, elHtml.length );
				}
				elHtml = stringWithoutLastSign + '<span style="color: green;">}</span>';
			}

debug.trace(elHtml);
			//Ext.get("jsonStringInputFrame").setHt
			//this.setValue( elHtml );
		}, this);

		/*editableContainer.on("keydown", function () {
			debug.trace("--KEYDOWN--");
		});

		editableContainer.on("click", function () {
			debug.trace("--KLICK--");
		});

		editableContainer.on("change", function () {
			debug.trace("--CHANGE--");
		});*/

		this.el.setDisplayed(false);

		this.rendered = true;
	},

	// private
	onDestroy : function(){
		Ext.destroy(this.wrap);
	},

	// private
	initValue : function() {
		this.originalValue = this.getValue();
	},

	getValue : function(){
		if(this.rendered){
			return this.el.dom.value;
		}

		return this.value;
	},

	setValue : function(v){
		if(this.rendered){
			this.el.dom.value = v;
		}

		if(v != this.value) {
			this.value = v;
			this.fireEvent('changed', this, this.value);
		}

		return this;
	}
});
Ext.reg('jsonstringinput', JsonStringInput);