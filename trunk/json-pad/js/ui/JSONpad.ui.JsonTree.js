var JSONpadUi_JsonTree = {
	xtype: 'treepanel',
	title: '',
	region: 'west',
	width: 200,
	split: true,
	collapsible: false,
	autoScroll: true,
	enableDD: true,
	id: 'JsonTree',
	ref: 'jsonTree',
	rootVisible: true,
	/*loader: new Ext.tree.TreeLoader(),
	selModel: new Ext.tree.DefaultSelectionModel({
		listeners: {
			'beforeselect': function (sel, n, o) {
				if ( n.getDepth() == 0 )
				{
					//disableEditor();
				}
				else
				{
					if ( n.attributes.leaf == false ) {
						/*JSONxEdit_jsonEditorForm.disable();

						if (JSONxEdit_jsonEditorTabPanel.activeTab < 2)
							JSONxEdit_jsonEditorTabPanel.setActiveTab(1);

						JSONxEdit_jsonEditorObjectForm.enable();
						JSONxEdit_jsonEditorObjectForm.setVisible(true);

						Ext.getCmp("JSONxEdit_FormPanel_editorObjectForm_index").setValue( n.attributes.text );
						Ext.getCmp("JSONxEdit_FormPanel_editorObjectForm_indexId").setValue( n.attributes.id );
						Ext.getCmp("JSONxEdit_FormPanel_editorObjectForm_index").enable();
						if ( n.parentNode != null )
						{
							if (n.parentNode.attributes.type == "array")
							{
								Ext.getCmp("JSONxEdit_FormPanel_editorObjectForm_index").disable();
							}
						}*/
					//} else {
						/*JSONxEdit_jsonEditorObjectForm.disable();

						if (JSONxEdit_jsonEditorTabPanel.activeTab < 2)
							JSONxEdit_jsonEditorTabPanel.setActiveTab(0);

						JSONxEdit_jsonEditorForm.enable();
						JSONxEdit_jsonEditorForm.setVisible(true);

						Ext.getCmp("JSONxEdit_FormPanel_editorForm_key").setValue( n.attributes.text );
						Ext.getCmp("JSONxEdit_FormPanel_editorForm_value").setValue( n.attributes.value );
						Ext.getCmp("JSONxEdit_FormPanel_editorForm_isNull").setValue( ( n.attributes.type == "null" ));
						Ext.getCmp("JSONxEdit_FormPanel_editorForm_keyId").setValue( n.attributes.id );

						Ext.getCmp("JSONxEdit_FormPanel_editorForm_key").enable();
						if ( n.parentNode != null )
						{
							if (n.parentNode.attributes.type == "array")
							{
								Ext.getCmp("JSONxEdit_FormPanel_editorForm_key").disable();
							}
						}*/
					/*}
				}
			}
		}
	}),*/
	tbar: {
		xtype: 'toolbar',
		id: 'JsonTree_tbar',
		items: [
		{
			id: 'JsonTree_tbar_add',
			iconCls: 'icon_tree_addKey',
			tooltip: 'Füge ein(en) Key/Objekt/Array hinzu',
			menu: {
				id: 'menu_tree_add',
				items: [
				{
					text: 'Add Key',
					id: 'btn_menu_tree_add_key'
				},
				'-',
				{
					text: 'Add Object',
					id: 'btn_menu_tree_add_object'
				},
				{
					text: 'Add Array',
					id: 'btn_menu_tree_add_array'
				}
				]
			}
		},
		{
			iconCls: 'icon_tree_delete',
			tooltip: 'Lösche selektierten Knoten',
			id: 'btn_menu_tree_delete'
		}
		]
	},
	root: {
		text: 'JSON',
		value: '|||JSON|ROOT|NODE|||',
		draggable: false,
		leaf: true,
		id:'JsonTree_RootNode',
		type: 'object',
		//@todo Dieser Listener ist ganz böse.. Herraus aus dem ui File!
		listeners: {
			"contextmenu": function(node, event)
			{
				var jsonTree = Ext.getCmp("JsonTree");
				var selectionModel = jsonTree.getSelectionModel();
				selectionModel.select( node );

				JsonTreeStatic.contextMenu.showAt(event.getXY());
				event.stopEvent();
			}
		}
	},
	loader: new Ext.tree.TreeLoader()
};