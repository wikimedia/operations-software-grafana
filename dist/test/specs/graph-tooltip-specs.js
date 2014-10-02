/*! grafana - v1.9.0 - 2014-11-10
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["jquery","directives/grafanaGraph.tooltip"],function(a,b){function c(a,c){var g={};g.scope=d,g.scope.panel={tooltip:{shared:!0},stack:!1},g.setup=function(a){g.setupFn=a},describe(a,function(){beforeEach(function(){g.setupFn();var a=new b(e,f,d);g.results=a.getMultiSeriesPlotHoverInfo(g.data,g.pos)}),c(g)})}var d={appEvent:sinon.spy(),onAppEvent:sinon.spy()},e=a("<div></div>"),f={};c("steppedLine false, stack false",function(a){a.setup(function(){a.data=[{data:[[10,15],[12,20]]},{data:[[10,2],[12,3]]}],a.pos={x:11}}),it("should return 2 series",function(){expect(a.results.length).to.be(2)}),it("should add time to results array",function(){expect(a.results.time).to.be(10)}),it("should set value and hoverIndex",function(){expect(a.results[0].value).to.be(15),expect(a.results[1].value).to.be(2),expect(a.results[0].hoverIndex).to.be(0)})}),c("steppedLine false, stack true, individual false",function(a){a.setup(function(){a.data=[{data:[[10,15],[12,20]]},{data:[[10,2],[12,3]]}],a.scope.panel.stack=!0,a.pos={x:11}}),it("should show stacked value",function(){expect(a.results[1].value).to.be(17)})}),c("steppedLine false, stack true, individual true",function(a){a.setup(function(){a.data=[{data:[[10,15],[12,20]]},{data:[[10,2],[12,3]]}],a.scope.panel.stack=!0,a.scope.panel.tooltip.value_type="individual",a.pos={x:11}}),it("should not show stacked value",function(){expect(a.results[1].value).to.be(2)})})});