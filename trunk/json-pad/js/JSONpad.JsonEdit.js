var JsonEditFunctions = {
	savedKeyForm: true,

	savedObjectForm: true,

	disableEditor: function (disableKeyForm, disableObjectForm) {
		if (disableKeyForm)
			Ext.getCmp("JsonEdit_editKey").disable();

		if (disableObjectForm)
			Ext.getCmp("JsonEdit_editObject").disable();
		
		if (disableObjectForm && !disableKeyForm) {
			Ext.getCmp("JsonEdit_editKey").setVisible(true);
			Ext.getCmp("JsonEdit_editKey").enable();
		}

		if (disableKeyForm && !disableObjectForm) {
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
		setStatusbarStatus('Saved selected key successfully', "valid", true);

		JsonEditFunctions.setSaved(true, false);
	},

	saveObjectdata: function () {
		setStatusbarBusy( true );

		var index = Ext.getCmp("JsonEdit_editObject_index").getValue();

		var jsonTree = Ext.getCmp("JsonTree");
		var selectionModel = jsonTree.getSelectionModel();
		var node = selectionModel.getSelectedNode();
		node.setText ( index );

		setStatusbarBusy( false );
		setStatusbarStatus('Saved selected object/array successfully', "valid", true);

		JsonEditFunctions.setSaved(false, true);
	},

	setUnsaved: function (keyForm, objectForm)
	{
		if (keyForm && JsonEditFunctions.savedKeyForm)
		{
			var keyf = Ext.getCmp("JsonEdit_editKey");
			keyf.setTitle(keyf.title + ' *');
			JsonEditFunctions.savedKeyForm = false;
		}

		if (objectForm && JsonEditFunctions.savedObjectForm)
		{
			var objectf = Ext.getCmp("JsonEdit_editObject");
			objectf.setTitle(objectf.title + ' *');
			JsonEditFunctions.savedObjectForm = false;
		}
	},

	setSaved: function (keyForm, objectForm)
	{
		if (keyForm)
		{
			var keyf = Ext.getCmp("JsonEdit_editKey");
			keyf.setTitle(keyf.title.replace(" *",""));
			JsonEditFunctions.savedKeyForm = true;
		}

		if (objectForm)
		{
			var objectf = Ext.getCmp("JsonEdit_editObject");
			objectf.setTitle(objectf.title.replace(" *",""));
			JsonEditFunctions.savedObjectForm = true;
		}
	}
};

var JSONpad_JsonEdit = {
	initHandler: function ( me ) {
		Ext.getCmp("btn_editKey_save").setHandler( JsonEditFunctions.saveKeyData );
		Ext.getCmp("btn_editObject_save").setHandler( JsonEditFunctions.saveObjectdata );
	},

	initEvents: function ( me ) {
		Ext.getCmp("JsonEdit").addListener( "render", function () {
			JsonEditFunctions.disableEditor(true,true)
		} );

		Ext.getCmp("JsonEdit_editKey").addListener("disable", function () {
			Ext.getCmp("JsonEdit_editKey_key").setValue("");
			Ext.getCmp("JsonEdit_editKey_value").setValue("");
		});

		
		

		/*Ext.getCmp("JsonEdit_editObject").addListener("disable", function () {
			Ext.getCmp("JsonEdit_editObject_index").setValue("");
		});
	 */

		//Ext.getCmp("JsonEdit_editKey_key").addListener( "change", JsonEditFunctions.saveKeyData );

		Ext.getCmp("JsonEdit_editKey_key").addListener( "keydown", function (o, e) {
			JsonEditFunctions.setUnsaved(true, false);
		});

		Ext.getCmp("JsonEdit_editKey_value").addListener( "keydown", function (o, e) {
			JsonEditFunctions.setUnsaved(true, false);
		});

		Ext.getCmp("JsonEdit_editObject_index").addListener( "keydown", function (o, e) {
			JsonEditFunctions.setUnsaved(false, true);
		});

		Ext.getCmp("JsonEdit_editKey_value").addListener( "change", function () {
			if ( Ext.getCmp("JsonEdit_editKey_key").disabled )
				Ext.getCmp("JsonEdit_editKey_key").setValue( Ext.getCmp("JsonEdit_editKey_value").getValue() );

		//JsonEditFunctions.saveKeyData();
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

		//JsonEditFunctions.saveKeyData();
		});

		Ext.getCmp("JsonEdit_editKey_isNull").addListener( "render", function () {
			Ext.getCmp("JsonEdit_editKey_isNull").getEl().on('click', function () {
				JsonEditFunctions.setUnsaved(true, false);
			});
		} );

		Ext.getCmp("JsonEdit_editKey_isNull").addListener('render', function(c) {
			new Ext.ToolTip({
				target: 'JsonEdit_editKey_isNull',
				html: 'Set value to "null"'
			});
		});
	}
}