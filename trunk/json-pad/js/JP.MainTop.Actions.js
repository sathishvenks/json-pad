JP.MainTop.Action = {
    
    aboutApplication: function(){
	
    },

    quitApplication: function(){
	JP.util.exit();
    }
};

JP.MainTop.Action.iconBar = {
    compressJsonString: function () {
	var stringInputField = this.findParentByType("viewport").findByType("jp_main_center_stringForm")[0].findByType("ux-codemirror")[0];
	var stringCompressed = jsmin("", stringInputField.getValue(), 3);

	stringInputField.setValue( stringCompressed.trim() );
    },
    formatJsonString: function () {
	var stringInputField = this.findParentByType("viewport").findByType("jp_main_center_stringForm")[0].findByType("ux-codemirror")[0];

	var json = JP.util.parseJson(stringInputField.getValue(), true);

	if (!json.errorObject) {
	    JP.util.setCodeMirrorStatus({
		text: 'Valid JSON string',
		iconCls: 'x-status-valid',
		clear: true
	    });
	} else {
	    JP.util.setCodeMirrorStatus({
		text: json.errorObject.length + ' Error/s in JSON string. Click for details...',
		iconCls: 'x-status-error x-status-error-detail-link',
		clear: false
	    });

	    var errorContainer = Ext.get(Ext.query(".x-status-error-detail-link")); //@todo Not good for tab plans..

	    /*new Ext.ToolTip({
		title: 'Blub',
		//id: 'content-anchor-tip',
		target: Ext.query(".x-status-error-detail-link"),
		anchor: 'left',
		html: "blub",
		width: 415,
		autoHide: false,
		closable: true
		//contentEl: 'content-tip', // load content from the page
	    });*/
	    //debug.trace(errorContainer.getXTypes());
	    //debug.dump(errorContainer.elements, "");

	    errorContainer.on("click", function (e, t, o) {
		debug.trace("TOOLT!P!"+errorContainer);
		debug.trace("TOOLT!P!"+errorContainer.id);
		debug.trace("TOOLT!P!"+t.id);
		debug.trace("TOOLT!P!"+o.id);
		/*new Ext.ToolTip({
		    title: 'Blub',
		    //id: 'content-anchor-tip',
		    target: t,
		    anchor: 'left',
		    html: "blub",
		    width: 415,
		    autoHide: false,
		    closable: true
		    //contentEl: 'content-tip', // load content from the page
		    listeners: {
			'render': function(){
			    this.header.on('click', function(e){
				e.stopEvent();
				Ext.Msg.alert('Link', 'Link to something interesting.');
				Ext.getCmp('content-anchor-tip').hide();
			    }, this, {
				delegate:'a'
			    });
			}
		    }
		});*/
	    });
	}

	if (!json.errorObject)
	    stringInputField.setValue( JSON.stringify(json, null, '  ') );
    },


    copyJsonStringToClipboard: function () {
	var stringInputField = this.findParentByType("viewport").findByType("jp_main_center_stringForm")[0].findByType("ux-codemirror")[0];
	JP.util.copyToClipboard( stringInputField.getValue() );

	//setStatusbarStatus("JSON String erfolgreich in die Zwischenablage kopiert", "valid", true); //@todo Status Nachricht implementieren
    },
    pasteJsonStringFromClipboard: function () {
	var stringInputField = this.findParentByType("viewport").findByType("jp_main_center_stringForm")[0].findByType("ux-codemirror")[0];
	var clipboardText = JP.util.pasteFromClipboard();
	stringInputField.setValue( clipboardText );
    },

    openXmlWindow: function () {
	if (JP.XmlWindow.Action.me == null)
	    JP.XmlWindow.Action.me = this;

	JP.XmlWindow.Action.openWindow();
    },

    switchHighlighting: function (btn, pressed) {
	var stringInput = this.findParentByType("viewport").findByType("jp_main_center_stringForm")[0].findByType("ux-codemirror")[0];
	if (pressed == true) stringInput.showCodeMirror();
	else stringInput.hideCodeMirror();
    },

    insertExample: function () {
	this.findParentByType("viewport").findByType("jp_main_center_stringForm")[0].findByType("ux-codemirror")[0].setValue(this.example);
    }
};