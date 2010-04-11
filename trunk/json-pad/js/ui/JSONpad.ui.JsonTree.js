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
	tbar: {
		xtype: 'toolbar',
		id: 'JsonTree_tbar',
		items: [
		{
			id: 'JsonTree_tbar_add',
			iconCls: 'icon_tree_addKey',
			tooltip: 'Add a key/object/array',
			menu: {
				id: 'menu_tree_add',
				items: [
				{
					text: 'Add key',
					id: 'btn_menu_tree_add_key'
				},
				'-',
				{
					text: 'Add object',
					id: 'btn_menu_tree_add_object'
				},
				{
					text: 'Add array',
					id: 'btn_menu_tree_add_array'
				}
				]
			}
		},
		{
			iconCls: 'icon_tree_delete',
			tooltip: 'Delete selected node',
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