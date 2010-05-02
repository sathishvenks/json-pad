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
		text: 'File',
		id: 'JsonStringForm_tbar_file',
		menu: {
		    id: 'menu_file',
		    items: [
		    {
			text: 'New',
			id: 'btn_menu_file_new',
			statusBarTip: 'Clears textarea and tree'
		    },
		    {
			text: 'Quit',
			id: 'btn_menu_file_quit',
			statusBarTip: 'Quit the application'
		    }
		    ]
		}
	    },
	    {
		text: 'Edit',
		id: 'JsonStringForm_tbar_edit',
		menu: {
		    id: 'menu_edit',
		    items: [
		    {
			text: 'XML2JSON Converter',
			id: 'btn_menu_file_xml2json',
			statusBarTip: 'Convert XML data to a JSON string and insert it in the textarea'
		    },
		    '-',
		    {
			text: 'Copy JSON string',
			id: 'btn_menu_file_copyJson',
			statusBarTip: 'Copy JSON string to clipboard'
		    },
		    {
			text: 'Paste JSON string',
			id: 'btn_menu_file_pasteJson',
			statusBarTip: 'Paste JSON string from cliboard'
		    }
		    ]
		}
	    },
	    {
		text: 'Help',
		id: 'JsonStringForm_tbar_help',
		menu: {
		    id: 'menu_help',
		    items: [
		    {
			text: 'About...',
			id: 'btn_menu_help_about',
			statusBarTip: 'About the application'
		    },'-',{
			text: 'Check for updates',
			id: 'btn_menu_help_checkUpdate',
			statusBarTip: 'Check if updates available'
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
		tooltip: 'Load JSON string into tree view',
		ref: 'btn_loadToTree'
	    },{
		iconCls: 'icon_loadFromTree',
		id: 'btn_menu_ico_loadFromTree',
		scale: 'large',
		tooltip: 'Get JSON string from tree data',
		ref: 'btn_loadFromTree'
	    },{
		iconCls: 'icon_loadFromTreeCompressed',
		id: 'btn_menu_ico_loadFromTreeCompressed',
		scale: 'large',
		tooltip: 'Get a compressed JSON string from tree data',
		ref: 'btn_loadFromTreeCompressed'
	    },
	    '-',
	    {
		iconCls: 'icon_copyJson',
		id: 'btn_menu_ico_copyJson',
		scale: 'large',
		tooltip: 'Copy JSON string into the clipboard',
		ref: 'btn_copyJson'
	    },{
		iconCls: 'icon_pasteJson',
		id: 'btn_menu_ico_pasteJson',
		scale: 'large',
		tooltip: 'Paste JSON string from the clipboard',
		ref: 'btn_pasteJson'
	    },
	    '-',
	    {
		iconCls: 'icon_convertXml',
		id: 'btn_menu_ico_convertXml',
		scale: 'large',
		tooltip: 'Convert XML data to JSON',
		ref: 'btn_convertXml'
	    },
	    '-',
	    {
		text: 'Syntax Highlighting On/Off',
		id: 'btn_menu_ico_codeMirror',
		enableToggle: true,
		pressed: true
	    },
	    '-',
	    {
		text: 'Examples',
		id: 'JsonStringForm_ibar_samples',
		scale: 'large',
		tooltip: 'Insert a JSON example',
		menu: {
		    id: 'menu_samples',
		    items: [{
			text: 'Example 1',
			id: 'JsonStringForm_ibar_samples_1',
			example: '{\n\t"Key": "value"\n}'
		    },{
			text: 'Example 2',
			id: 'JsonStringForm_ibar_samples_2',
			example: '{\n\tCreditCard : "MasterCard",\n\tNumber : "1234-5678-9012-3456",\n\tHolder : {\n\t\tName : "Rich",\n\t\tfirstName : "Rainer",\n\t\tsex : "männlich",\n\t\tLikes : [\n\t\t\t"Riding",\n\t\t\t"Swimming",\n\t\t\t"Reading"\n\t\t],\n\t\tAge : null\n\t},\n\tCovering : 2000000,\n\tCurrency : "EURO"\n}'
		    },{
			text: 'Example 3',
			id: 'JsonStringForm_ibar_samples_3',
			example: '{\n\t"MyObject": {\n\t\t"MyKey": "with value"\n\t},\n\t"MyArray": ["Value1", "Value2"]\n}'
		    }]
		}
	    }
	    ]
	}
	]
    },
    items: [
    /*{
		xtype: 'textarea',
		anchor: '100% 100%',
		hideLabel: true,
		name: 'jsonString',
		id: 'JsonStringForm_jsonString',
		ref: 'stringInput'
	}*/
    /*{
		xtype: 'htmleditor',
		anchor: '100% 100%',
		hideLabel: true,
		name: 'jsonString',
		enableAlignments: false,
		enableColors: false,
		enableFont: false,
		enableFontSize: false,
		enableFormat: true,
		enableLinks: false,
		enableLists: false,
		enableSourceEdit: true,
		id: 'JsonStringForm_jsonString',
		ref: 'stringInput'
	}*//*{
		xtype: 'jsonstringinput',
		anchor: '100% 100%',
		hideLabel: true,
		name: 'jsonString',
		id: 'JsonStringForm_jsonString',
		ref: 'stringInput'
	}*/{
	xtype: 'ux-codemirror',
	codeMirrorPath: 'js/extern/CodeMirror',
	language: 'js', // possibilities: 'js', 'css', 'php', 'htm', 'html', 'xml', anything else is plain text
	hideLabel: true,
	name: 'jsonString',
	id: 'JsonStringForm_jsonString',
	ref: 'stringInput'
    }
    ]
};