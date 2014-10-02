/*! grafana - v1.9.0 - 2014-11-10
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["./helpers","panels/graph/seriesOverridesCtrl"],function(a){describe("SeriesOverridesCtrl",function(){var b=new a.ControllerTestContext;beforeEach(module("grafana.services")),beforeEach(module("grafana.panels.graph")),beforeEach(b.providePhase()),beforeEach(b.createControllerPhase("SeriesOverridesCtrl")),beforeEach(function(){b.scope.render=function(){}}),describe("Controller should init overrideMenu",function(){it("click should include option and value index",function(){expect(b.scope.overrideMenu[1].submenu[1].click).to.be("menuItemSelected(1,1)")})}),describe("When setting an override",function(){beforeEach(function(){b.scope.setOverride(1,0)}),it("should set override property",function(){expect(b.scope.override.lines).to.be(!0)}),it("should update view model",function(){expect(b.scope.currentOverrides[0].name).to.be("Lines"),expect(b.scope.currentOverrides[0].value).to.be("true")})}),describe("When removing overide",function(){it("click should include option and value index",function(){b.scope.setOverride(1,0),b.scope.removeOverride({propertyName:"lines"}),expect(b.scope.currentOverrides.length).to.be(0)})})})});