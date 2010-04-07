var JSONpadUi_JsonString = {
	xtype: 'form',
	title: '',
	layout: 'fit',
	region: 'north',
	height: 300,
	split: true,
	ref: 'jsonString',
	id: 'JsonStringForm',
	tbar: {
		xtype: 'container',
		layout: 'anchor',
		cls: 'parentToolbar',
		items    : [
		{
			xtype: 'toolbar',
			id: 'JsonStringForm_tbar',
			ref: '../tbar_menu',
			items: [
			{
				text: 'Datei',
				id: 'JsonStringForm_tbar_file',
				menu: {
					id: 'menu_file',
					items: [
					{
						text: 'Neu',
						id: 'btn_menu_file_new'
					},
					{
						text: 'Beenden',
						id: 'btn_menu_file_quit'
					}
					]
				}
			},
			{
				text: 'Bearbeiten',
				id: 'JsonStringForm_tbar_edit',
				menu: {
					id: 'menu_edit',
					items: [
					{
						text: 'JSON kopieren',
						id: 'btn_menu_file_copyJson'
					},
					{
						text: 'JSON einfügen',
						id: 'btn_menu_file_pasteJson'
					}
					]
				}
			},
			{
				text: 'Hilfe',
				id: 'JsonStringForm_tbar_help',
				menu: {
					id: 'menu_help',
					items: [
					{
						text: 'Auf Update prüfen',
						id: 'btn_menu_help_checkUpdate'
					}
					]
				}
			}
			]
		},{
			xtype: 'toolbar',
			id: 'JsonStringForm_ibar',
			ref: '../tbar_icons',
			items: [
			{
				iconCls: 'icon_loadToTree',
				id: 'btn_menu_ico_loadToTree',
				scale: 'large',
				tooltip: 'Lade JSON String in Baum-Ansicht',
				ref: 'btn_loadToTree'
			},{
				iconCls: 'icon_loadFromTree',
				id: 'btn_menu_ico_loadFromTree',
				scale: 'large',
				tooltip: 'Lade JSON String aus der Baum-Ansicht',
				ref: 'btn_loadFromTree'
			},
			'-',
			{
				iconCls: 'icon_copyJson',
				id: 'btn_menu_ico_copyJson',
				scale: 'large',
				tooltip: 'Kopiere JSON String in die Zwischenablage',
				ref: 'btn_copyJson'
			},{
				iconCls: 'icon_pasteJson',
				id: 'btn_menu_ico_pasteJson',
				scale: 'large',
				tooltip: 'Füge JSON String aus der Zwischenablage ein',
				ref: 'btn_pasteJson'
			},
			'-',
			{
				text: 'Beispiele',
				id: 'JsonStringForm_ibar_samples',
				scale: 'large',
				tooltip: 'Füge einen Beispiel JSON String ein',
				menu: {
					id: 'menu_samples',
					items: [{
						text: 'Beispiel 1',
						id: 'JsonStringForm_ibar_samples_1',
						example: '{\n"test":"test2"\n}'
					},{
						text: 'Beispiel 2',
						id: 'JsonStringForm_ibar_samples_2',
						example: '{\n\t"Kreditkarte": "Xema",\n\t"Nummer": "1234-5678-9012-3456",\n\t"Inhaber": {\n\t\t"Name": "Reich",\n\t\t"Vorname": "Rainer",\n\t\t"Geschlecht": "männlich",\n\t\t"Vorlieben": [ "Reiten", "Schwimmen", "Lesen" ],\n\t\t"Alter": null\n\t},\n\t"Deckung": 2e+6,\n\t"Währung": "EURO"\n}'
					},{
						text: 'Beispiel 3',
						id: 'JsonStringForm_ibar_samples_3',
						example: '{\n\tfirstName: "christopher",\n\tlastName: "S.",\n\tchildren: [\n\t\t{\n\t\t\tname: "Markus",\n\t\t\tage: 10\n\t\t},\n\t\t{\n\t\t\tname: "Michael",\n\t\t\tage: 8\n\t\t}\n\t]\n}'
					}]
				}
			}
			]
		}
		]
	},
	items: [
	{
		xtype: 'textarea',
		anchor: '100% 100%',
		hideLabel: true,
		name: 'jsonString',
		id: 'JsonStringForm_jsonString',
		ref: 'stringInput'
	}
	]
};