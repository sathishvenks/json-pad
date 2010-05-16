JP.MainTop.iconBar = Ext.extend(Ext.Toolbar, {
    //id: 'JPtopIconBar',
    initComponent: function() {
	this.items = [
	{
	    xtype: 'buttongroup',
	    title: '',
	    columns: 2,
	    id: 'JPiconBarBtnGroupTree',
	    ref: 'btnGroup_tree',
	    items: [
	    {
		xtype: 'button',
		iconCls: 'icon_loadToTree',
		scale: 'large',
		tooltipType: 'qtip',
		tooltip: 'Load JSON String to tree',
		id: 'BtnGroupTreeToTree',
		ref: '../../btn_toTree'
	    },
	    {
		xtype: 'button',
		iconCls: 'icon_loadFromTree',
		tooltip: 'Load data from tree as JSON string',
		tooltipType: 'qtip',
		scale: 'large',
		id: 'BtnGroupTreeFromTree',
		ref: '../../btn_fromTree'
	    }
	    ]
	},
	{
	    xtype: 'buttongroup',
	    title: '',
	    columns: 2,
	    ref: 'btnGroup_format',
	    items: [
	    {
		iconCls: 'icon_format',
		scale: 'large',
		ref: 'indent'
	    },
	    {
		iconCls: 'icon_compress',
		scale: 'large',
		ref: 'compress'
	    }
	    ]
	},
	{
	    xtype: 'buttongroup',
	    title: '',
	    columns: 2,
	    ref: 'btnGroup_clipboard',
	    items: [
	    {
		xtype: 'button',
		iconCls: 'icon_copyJson',
		scale: 'large',
		ref: 'copy'
	    },
	    {
		xtype: 'button',
		iconCls: 'icon_pasteJson',
		scale: 'large',
		ref: 'paste'
	    }
	    ]
	},
	{
	    xtype: 'buttongroup',
	    title: '',
	    columns: 2,
	    ref: 'btnGroup_others',
	    items: [
	    {
		xtype: 'button',
		iconCls: 'icon_convertXml',
		scale: 'large',
		ref: 'convertXML'
	    },
	    {
		xtype: 'button',
		iconCls: 'icon_highlight',
		scale: 'large',
		ref: 'switchHighlighting',
		enableToggle: true,
		pressed: true
	    }
	    ]
	},
	'->',
	{
	    text: 'Examples',
	    scale: 'large',
	    arrowAlign: 'left',
	    ref: 'btnExamples',
	    menu: {
		ref: 'menu',
		items: [
		{
		    text: 'Example 1',
		    ref: 'example1',
		    example: '{\n\t"Key": "value"\n}'
		},
		{
		    text: 'Example 2',
		    ref: 'example2',
		    example: '{\n\t"CreditCard" : "MasterCard",\n\t"Number" : "1234-5678-9012-3456",\n\t"Holder" : {\n\t\t"Name" : "Rich",\n\t\t"firstName" : "Rainer",\n\t\t"sex" : "male",\n\t\t"Likes" : [\n\t\t\t"Riding",\n\t\t\t"Swimming",\n\t\t\t"Reading"\n\t\t],\n\t\t"Age" : null\n\t},\n\t"Covering" : 2000000,\n\t"Currency" : "EURO"\n}'
		},
		{
		    text: 'Example 3',
		    ref: 'example3',
		    example: '{\n\t"web-app" : {\n\t\t"servlet" : [\n\t\t\t{\n\t\t\t\t"servlet-name" : "cofaxCDS",\n\t\t\t\t"servlet-class" : "org.cofax.cds.CDSServlet",\n\t\t\t\t"init-param" : {\n\t\t\t\t\t"configGlossary:installationAt" : "Philadelphia, PA",\n\t\t\t\t\t"configGlossary:adminEmail" : "ksm@pobox.com",\n\t\t\t\t\t"configGlossary:poweredBy" : "Cofax",\n\t\t\t\t\t"configGlossary:poweredByIcon" : "/images/cofax.gif",\n\t\t\t\t\t"configGlossary:staticPath" : "/content/static",\n\t\t\t\t\t"templateProcessorClass" : "org.cofax.WysiwygTemplate",\n\t\t\t\t\t"templateLoaderClass" : "org.cofax.FilesTemplateLoader",\n\t\t\t\t\t"templatePath" : "templates",\n\t\t\t\t\t"templateOverridePath" : "",\n\t\t\t\t\t"defaultListTemplate" : "listTemplate.htm",\n\t\t\t\t\t"defaultFileTemplate" : "articleTemplate.htm",\n\t\t\t\t\t"useJSP" : false,\n\t\t\t\t\t"jspListTemplate" : "listTemplate.jsp",\n\t\t\t\t\t"jspFileTemplate" : "articleTemplate.jsp",\n\t\t\t\t\t"cachePackageTagsTrack" : 200,\n\t\t\t\t\t"cachePackageTagsStore" : 200,\n\t\t\t\t\t"cachePackageTagsRefresh" : 60,\n\t\t\t\t\t"cacheTemplatesTrack" : 100,\n\t\t\t\t\t"cacheTemplatesStore" : 50,\n\t\t\t\t\t"cacheTemplatesRefresh" : 15,\n\t\t\t\t\t"cachePagesTrack" : 200,\n\t\t\t\t\t"cachePagesStore" : 100,\n\t\t\t\t\t"cachePagesRefresh" : 10,\n\t\t\t\t\t"cachePagesDirtyRead" : 10,\n\t\t\t\t\t"searchEngineListTemplate" : "forSearchEnginesList.htm",\n\t\t\t\t\t"searchEngineFileTemplate" : "forSearchEngines.htm",\n\t\t\t\t\t"searchEngineRobotsDb" : "WEB-INF/robots.db",\n\t\t\t\t\t"useDataStore" : true,\n\t\t\t\t\t"dataStoreClass" : "org.cofax.SqlDataStore",\n\t\t\t\t\t"redirectionClass" : "org.cofax.SqlRedirection",\n\t\t\t\t\t"dataStoreName" : "cofax",\n\t\t\t\t\t"dataStoreDriver" : "com.microsoft.jdbc.sqlserver.SQLServerDriver",\n\t\t\t\t\t"dataStoreUrl" : "jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon",\n\t\t\t\t\t"dataStoreUser" : "sa",\n\t\t\t\t\t"dataStorePassword" : "dataStoreTestQuery",\n\t\t\t\t\t"dataStoreTestQuery" : "SET NOCOUNT ON;select test=\'test\';",\n\t\t\t\t\t"dataStoreLogFile" : "/usr/local/tomcat/logs/datastore.log",\n\t\t\t\t\t"dataStoreInitConns" : 10,\n\t\t\t\t\t"dataStoreMaxConns" : 100,\n\t\t\t\t\t"dataStoreConnUsageLimit" : 100,\n\t\t\t\t\t"dataStoreLogLevel" : "debug",\n\t\t\t\t\t"maxUrlLength" : 500\n\t\t\t\t}\n\t\t\t}\n\t\t]\n\t}\n}'
		}
		]
	    }
	}
	];
	JP.MainTop.iconBar.superclass.initComponent.call(this);

	this.btnGroup_format.indent.setHandler( JP.MainTop.Action.iconBar.formatJsonString, this );
	this.btnGroup_format.compress.setHandler( JP.MainTop.Action.iconBar.compressJsonString, this );

	this.btnGroup_clipboard.copy.setHandler( JP.MainTop.Action.iconBar.copyJsonStringToClipboard, this );
	this.btnGroup_clipboard.paste.setHandler( JP.MainTop.Action.iconBar.pasteJsonStringFromClipboard, this );

	this.btnGroup_others.convertXML.setHandler( JP.MainTop.Action.iconBar.openXmlWindow, this );
	this.btnGroup_others.switchHighlighting.on( "toggle", JP.MainTop.Action.iconBar.switchHighlighting, this );
	
	this.btnExamples.menu.example1.setHandler( JP.MainTop.Action.iconBar.insertExample, this.btnExamples.menu.example1 );
	this.btnExamples.menu.example2.setHandler( JP.MainTop.Action.iconBar.insertExample, this.btnExamples.menu.example2 );
	this.btnExamples.menu.example3.setHandler( JP.MainTop.Action.iconBar.insertExample, this.btnExamples.menu.example3 );
    }
});

Ext.reg('jp_main_top_iconbar', JP.MainTop.iconBar);