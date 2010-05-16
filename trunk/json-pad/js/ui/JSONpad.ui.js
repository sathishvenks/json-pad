JSONpadUi = Ext.extend(Ext.Viewport, {
    layout: 'border',
    initComponent: function() {
        this.items = [
            /*JSONpadUi_JsonString,
            JSONpadUi_JsonTree,
            JSONpadUi_JsonEdit,*/
			JSONpadUi_StatusBar
        ];
        JSONpadUi.superclass.initComponent.call(this);
    }
});