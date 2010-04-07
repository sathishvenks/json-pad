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
	}
};

var JSONpad_JsonEdit = {
	initHandler: function ( me ) {

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