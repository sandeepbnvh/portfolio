//sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/san/portfolio/model/models","com/san/portfolio/firebase"],function(e,i,o,t){"use strict";return e.extend("com.san.portfolio.Component",{metadata:{manifest:"json",card:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(o.createDeviceModel(),"device");this.setModel(t.initializeFirebase(),"firebase")}})});
