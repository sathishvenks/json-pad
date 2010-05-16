JP.MainTop.mainBar = Ext.extend(Ext.Toolbar, {
    //id: 'JsonStringForm_tbar',
    initComponent: function() {
	this.items = [
	{
	    text: 'File',
	    id: 'JsonStringForm_tbar_file',
	    ref: 'file',
	    menu: {
		id: 'menu_file',
		ref: 'menu',
		items: [
		/*{
		    text: 'New',
		    id: 'btn_menu_file_new',
		    statusBarTip: 'Clears textarea and tree'
		},*/
		{
		    text: 'Quit',
		    id: 'btn_menu_file_quit',
		    statusBarTip: 'Quit the application',
		    ref: 'quit'
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
		    //handler: JP.TopPanel.Action.aboutApplication
		},'-',{
		    text: 'Check for updates',
		    id: 'btn_menu_help_checkUpdate',
		    statusBarTip: 'Check if updates available'
		}
		]
	    }
	}
	];
	JP.MainTop.mainBar.superclass.initComponent.call(this);


	this.file.menu.quit.setHandler( JP.MainTop.Action.quitApplication );
    }
});

Ext.reg('jp_main_top_mainbar', JP.MainTop.mainBar);