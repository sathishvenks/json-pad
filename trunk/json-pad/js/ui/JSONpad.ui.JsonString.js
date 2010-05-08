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
	    }/*,{
		iconCls: 'icon_loadFromTreeCompressed',
		id: 'btn_menu_ico_loadFromTreeCompressed',
		scale: 'large',
		tooltip: 'Get a compressed JSON string from tree data',
		ref: 'btn_loadFromTreeCompressed'
	    }*/,'-',
	    {
		iconCls: 'icon_compress',
		//text: 'Compress',
		id: 'btn_menu_ico_compress',
		scale: 'large',
		tooltip: 'Compress JSON string',
		ref: 'btn_compress'
	    },{
		iconCls: 'icon_format',
		//text: 'Format',
		id: 'btn_menu_ico_format',
		scale: 'large',
		tooltip: 'Format JSON string',
		ref: 'btn_format'
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
			example: '{\n\t"CreditCard" : "MasterCard",\n\t"Number" : "1234-5678-9012-3456",\n\t"Holder" : {\n\t\t"Name" : "Rich",\n\t\t"firstName" : "Rainer",\n\t\t"sex" : "male",\n\t\t"Likes" : [\n\t\t\t"Riding",\n\t\t\t"Swimming",\n\t\t\t"Reading"\n\t\t],\n\t\t"Age" : null\n\t},\n\t"Covering" : 2000000,\n\t"Currency" : "EURO"\n}'
		    },{
			text: 'Example 3',
			id: 'JsonStringForm_ibar_samples_3',
			example: '{\n\t"web-app" : {\n\t\t"servlet" : [\n\t\t\t{\n\t\t\t\t"servlet-name" : "cofaxCDS",\n\t\t\t\t"servlet-class" : "org.cofax.cds.CDSServlet",\n\t\t\t\t"init-param" : {\n\t\t\t\t\t"configGlossary:installationAt" : "Philadelphia, PA",\n\t\t\t\t\t"configGlossary:adminEmail" : "ksm@pobox.com",\n\t\t\t\t\t"configGlossary:poweredBy" : "Cofax",\n\t\t\t\t\t"configGlossary:poweredByIcon" : "/images/cofax.gif",\n\t\t\t\t\t"configGlossary:staticPath" : "/content/static",\n\t\t\t\t\t"templateProcessorClass" : "org.cofax.WysiwygTemplate",\n\t\t\t\t\t"templateLoaderClass" : "org.cofax.FilesTemplateLoader",\n\t\t\t\t\t"templatePath" : "templates",\n\t\t\t\t\t"templateOverridePath" : "",\n\t\t\t\t\t"defaultListTemplate" : "listTemplate.htm",\n\t\t\t\t\t"defaultFileTemplate" : "articleTemplate.htm",\n\t\t\t\t\t"useJSP" : false,\n\t\t\t\t\t"jspListTemplate" : "listTemplate.jsp",\n\t\t\t\t\t"jspFileTemplate" : "articleTemplate.jsp",\n\t\t\t\t\t"cachePackageTagsTrack" : 200,\n\t\t\t\t\t"cachePackageTagsStore" : 200,\n\t\t\t\t\t"cachePackageTagsRefresh" : 60,\n\t\t\t\t\t"cacheTemplatesTrack" : 100,\n\t\t\t\t\t"cacheTemplatesStore" : 50,\n\t\t\t\t\t"cacheTemplatesRefresh" : 15,\n\t\t\t\t\t"cachePagesTrack" : 200,\n\t\t\t\t\t"cachePagesStore" : 100,\n\t\t\t\t\t"cachePagesRefresh" : 10,\n\t\t\t\t\t"cachePagesDirtyRead" : 10,\n\t\t\t\t\t"searchEngineListTemplate" : "forSearchEnginesList.htm",\n\t\t\t\t\t"searchEngineFileTemplate" : "forSearchEngines.htm",\n\t\t\t\t\t"searchEngineRobotsDb" : "WEB-INF/robots.db",\n\t\t\t\t\t"useDataStore" : true,\n\t\t\t\t\t"dataStoreClass" : "org.cofax.SqlDataStore",\n\t\t\t\t\t"redirectionClass" : "org.cofax.SqlRedirection",\n\t\t\t\t\t"dataStoreName" : "cofax",\n\t\t\t\t\t"dataStoreDriver" : "com.microsoft.jdbc.sqlserver.SQLServerDriver",\n\t\t\t\t\t"dataStoreUrl" : "jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon",\n\t\t\t\t\t"dataStoreUser" : "sa",\n\t\t\t\t\t"dataStorePassword" : "dataStoreTestQuery",\n\t\t\t\t\t"dataStoreTestQuery" : "SET NOCOUNT ON;select test=\'test\';",\n\t\t\t\t\t"dataStoreLogFile" : "/usr/local/tomcat/logs/datastore.log",\n\t\t\t\t\t"dataStoreInitConns" : 10,\n\t\t\t\t\t"dataStoreMaxConns" : 100,\n\t\t\t\t\t"dataStoreConnUsageLimit" : 100,\n\t\t\t\t\t"dataStoreLogLevel" : "debug",\n\t\t\t\t\t"maxUrlLength" : 500\n\t\t\t\t}\n\t\t\t}\n\t\t]\n\t}\n}'
		    }]
		}
	    }
	    ]
	}
	]
    },
    items: [{
	xtype: 'ux-codemirror',
	codeMirrorPath: 'js/extern/CodeMirror',
	language: 'js', // possibilities: 'js', 'css', 'php', 'htm', 'html', 'xml', anything else is plain text
	hideLabel: true,
	name: 'jsonString',
	id: 'JsonStringForm_jsonString',
	ref: 'stringInput',
	initCallBackFn: function (me) {
	    debug.trace("CALLBACK")
	    var formPanel = Ext.getCmp("JsonStringForm");
	    formPanel.setWidth(formPanel.getWidth()-1);

	    if (JSONpadAir.settings.syntax_hl == "false") {
		Ext.getCmp("btn_menu_ico_codeMirror").toggle(false, true);
		me.hideCodeMirror();
	    }
	}
    }]
};