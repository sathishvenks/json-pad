Ext.ux.ClickToolTip = Ext.extend(Ext.ToolTip, {
    showDelay: 0,
    initTarget : function(target){
	var t;
	if((t = Ext.get(target))){
	    if(this.target){
		var tg = Ext.get(this.target);
		this.mun(tg, 'click', this.onTargetOver, this);
	    }
	    this.mon(t, {
		click: this.onTargetOver,
		scope: this
	    });
	    this.target = t;
	}
	if(this.anchor){
	    this.anchorTarget = this.target;
	}
    },

    // private
    onTargetClick : function(e){
        if(this.disabled){ // || e.within(this.target.dom, true)
            return;
        }
        var t = e.getTarget(this.delegate);
        if (t) {
            this.triggerElement = t;
            this.clearTimer('hide');
            this.targetXY = e.getXY();
            this.delayShow();
        }
    }
});

Ext.reg('clicktooltip', Ext.ux.ClickToolTip);