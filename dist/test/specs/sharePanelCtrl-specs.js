/*! grafana - v1.9.0 - 2014-12-09
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["./helpers","controllers/sharePanelCtrl"],function(a){describe("SharePanelCtrl",function(){function b(a){c.timeSrv.timeRangeForUrl=sinon.stub().returns(a)}var c=new a.ControllerTestContext;b({from:"now-1h",to:"now"}),beforeEach(module("grafana.controllers")),beforeEach(c.providePhase()),beforeEach(c.createControllerPhase("SharePanelCtrl")),describe("shareUrl with current time range and panel",function(){it("should generate share url relative time",function(){c.$location.path("/test"),c.scope.panel={id:22},b({from:"now-1h",to:"now"}),c.scope.buildUrl(),expect(c.scope.shareUrl).to.be("http://server/#/test?from=now-1h&to=now&panelId=22&fullscreen")}),it("should generate share url absolute time",function(){c.$location.path("/test"),c.scope.panel={id:22},b({from:13621788e5,to:13966488e5}),c.scope.buildUrl(),expect(c.scope.shareUrl).to.be("http://server/#/test?from=1362178800000&to=1396648800000&panelId=22&fullscreen")}),it("should remove panel id when toPanel is false",function(){c.$location.path("/test"),c.scope.panel={id:22},c.scope.toPanel=!1,b({from:"now-1h",to:"now"}),c.scope.buildUrl(),expect(c.scope.shareUrl).to.be("http://server/#/test?from=now-1h&to=now")}),it("should include template variables in url",function(){c.$location.path("/test"),c.scope.panel={id:22},c.scope.includeTemplateVars=!0,c.scope.toPanel=!1,c.templateSrv.variables=[{name:"app",current:{text:"mupp"}},{name:"server",current:{text:"srv-01"}}],b({from:"now-1h",to:"now"}),c.scope.buildUrl(),expect(c.scope.shareUrl).to.be("http://server/#/test?from=now-1h&to=now&var-app=mupp&var-server=srv-01")})})})});