var JSONpadUi_JsonEdit = {
	xtype: 'tabpanel',
	activeTab: 0,
	region: 'center',
	id: 'JsonEdit',
	ref: 'jsonEdit',
	items: [
	{
		xtype: 'form',
		title: 'Edit Key',
		labelWidth: 100,
		labelAlign: 'left',
		layout: 'form',
		frame: true,
		border: false,
		id: 'JsonEdit_editKey',
		items: [
		{
			xtype: 'textarea',
			fieldLabel: 'Key',
			anchor: '100%',
			name: 'key',
			id: 'JsonEdit_editKey_key',
			enableKeyEvents: true
		},
		{
			xtype: 'textarea',
			fieldLabel: 'Value',
			anchor: '100%',
			name: 'value',
			id: 'JsonEdit_editKey_value',
			enableKeyEvents: true
		},
		{
			xtype: 'checkbox',
			fieldLabel: 'isNull',
			boxLabel: '',
			anchor: '100%',
			name: 'isNull',
			id: 'JsonEdit_editKey_isNull'
		}
		],
		buttons: [{
			text: 'SAVE',
			id: 'btn_editKey_save'
		//handler: saveKey
		}]
	},
	{
		xtype: 'form',
		title: 'Edit Object/Array',
		labelWidth: 100,
		labelAlign: 'left',
		layout: 'form',
		frame: true,
		id: 'JsonEdit_editObject',
		items: [
		{
			xtype: 'textarea',
			fieldLabel: 'Index',
			anchor: '100%',
			name: 'index',
			id: 'JsonEdit_editObject_index',
			enableKeyEvents: true
		}
		],
		buttons: [{
			text: 'SAVE',
			id: 'btn_editObject_save'
		//handler: saveIndex
		}]
	}
	]
}