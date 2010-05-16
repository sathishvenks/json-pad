JP.util = {
    exit: function () {
	if ( Ext.isAir ) JP.util.air.exit();
	else JP.util.web.exit();
    },
    copyToClipboard: function (string) {
	if ( Ext.isAir ) JP.util.air.copyToClipboard(string);
	else JP.util.web.copyToClipboard(string);
    },
    pasteFromClipboard: function () {
	if ( Ext.isAir ) return JP.util.air.pasteFromClipboard();
	else return JP.util.web.pasteFromClipboard();
    },
    parseJson: function (string) {
	var lint = JSLINT(string);

	if (lint) {
	    return Ext.decode( string );
	} else {
	    var errorArray = [];
	    for(var i = 0; i <= JSLINT.errors.length-2; i++) {
		var errorMsg = "Error on line {0} character {1}: {2}";
		var errorExplain = JSLINT.errors[i].reason;

		var err = {
		    line: JSLINT.errors[i].line,
		    character: JSLINT.errors[i].character,
		    msg: String.format(errorMsg, JSLINT.errors[i].line, JSLINT.errors[i].character, errorExplain)
		}

		errorArray.push(err);
	    }

	    return {
		errorObject: errorArray
	    };
	}
    },
    setCodeMirrorStatus: function (options) {
	var sb = Ext.getCmp("JPstringInputStatusBar"); //@todo We don't like Ext.getCmp at this place!
	sb.setStatus(options);
    }
}

JP.util.web = {
    exit: function () {
	self.close();
    },
    copyToClipboard: function (string) {
	//@todo Copy to clipboard für browser einfügen
    },
    pasteFromClipboard: function () {
	//@todo Paste fromt clipboard für browser einfügen
    }
};

JP.util.air = {
    exit: function () {
	var exitingEvent = new air.Event(air.Event.EXITING, false, true);
	air.NativeApplication.nativeApplication.dispatchEvent(exitingEvent);
	if (!exitingEvent.isDefaultPrevented())
	    air.NativeApplication.nativeApplication.exit();
    },
    copyToClipboard: function (string) {
	air.Clipboard.generalClipboard.clear();
	air.Clipboard.generalClipboard.setData(air.ClipboardFormats.TEXT_FORMAT, string, false);
    },
    pasteFromClipboard: function () {
	var txt = air.Clipboard.generalClipboard.getData( air.ClipboardFormats.TEXT_FORMAT );

	if (txt == null)
	    txt = "";

	return txt.trim();
    }
};