var JsonEditFunctions = {
	disableEditor: function (disableKeyForm, disableObjectForm) {
		if (disableKeyForm)
		{
			Ext.getCmp("JsonEdit_editKey_key").setValue("");
			Ext.getCmp("JsonEdit_editKey_value").setValue("");
			Ext.getCmp("JsonEdit_editKey").disable();
		}

		if (disableObjectForm)
		{
			Ext.getCmp("JsonEdit_editObject_index").setValue("");
			Ext.getCmp("JsonEdit_editObject").disable();
		}
		
		if (!disableObjectForm)
		{
			Ext.getCmp("JsonEdit_editKey").setVisible(true);
			Ext.getCmp("JsonEdit_editKey").enable();
		}

		if (!disableKeyForm)
		{
			Ext.getCmp("JsonEdit_editObject").setVisible(true);
			Ext.getCmp("JsonEdit_editObject").enable();
		}
	},

	saveKeyData: function () {
		setStatusbarBusy( true );

		var key = Ext.getCmp("JsonEdit_editKey_key").getValue();
		var value = Ext.getCmp("JsonEdit_editKey_value").getValue();
		var isNull = Ext.getCmp("JsonEdit_editKey_isNull").getValue();
		
		var jsonTree = Ext.getCmp("JsonTree");
		var selectionModel = jsonTree.getSelectionModel();
		var node = selectionModel.getSelectedNode();

		
		if (isNull)
		{
			value = "null";
			node.attributes.type = "null";
		}
		else
		{
			if ( !isNaN(value) && !isString(value) && value != null )
				node.attributes.type = "number";
			else
				node.attributes.type = "string";
		}
		
		node.setText ( key );

		node.attributes.value = value;

		setStatusbarBusy( false );
		setStatusbarStatus('Selektierter Key erfolgreich gespeichert', "valid", true);
	},

	saveObjectdata: function () {
		setStatusbarBusy( true );

		var index = Ext.getCmp("JsonEdit_editObject_index").getValue();

		var jsonTree = Ext.getCmp("JsonTree");
		var selectionModel = jsonTree.getSelectionModel();
		var node = selectionModel.getSelectedNode();
		node.setText ( index );

		setStatusbarBusy( false );
		setStatusbarStatus('Selektiertes Array od. Objekt erfolgreich gespeichert', "valid", true);
	}
};

var JSONpad_JsonEdit = {
	initHandler: function ( me ) {
		Ext.getCmp("btn_editKey_save").setHandler( JsonEditFunctions.saveKeyData );
		Ext.getCmp("btn_editObject_save").setHandler( JsonEditFunctions.saveObjectdata );
	},

	initEvents: function ( me ) {
		Ext.getCmp("JsonEdit").addListener( "afterlayout", function () {
			JsonEditFunctions.disableEditor(true,true)
		} );


		Ext.getCmp("JsonEdit_editKey_value").addListener( "change", function () {
			if ( Ext.getCmp("JsonEdit_editKey_key").disabled )
				Ext.getCmp("JsonEdit_editKey_key").setValue( Ext.getCmp("JsonEdit_editKey_value").getValue() );
		});

		Ext.getCmp("JsonEdit_editKey_isNull").addListener('check', function (checkbox, checked) {
			if (checked)
			{
				Ext.getCmp("JsonEdit_editKey_value").setValue("null");
				Ext.getCmp("JsonEdit_editKey_value").fireEvent("change");
				Ext.getCmp("JsonEdit_editKey_value").disable();
			}
			else
			{
				Ext.getCmp("JsonEdit_editKey_value").enable();
			}
		});
	}
}