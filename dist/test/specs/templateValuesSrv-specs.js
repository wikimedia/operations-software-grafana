/*! grafana - v1.9.0 - 2014-12-09
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["mocks/dashboard-mock","./helpers","moment","services/templateValuesSrv"],function(a,b,c){describe("templateValuesSrv",function(){function a(a,b){describe(a,function(){var a={};a.setup=function(b){a.setupFn=b},beforeEach(function(){a.setupFn();var b={};b.metricFindQuery=sinon.stub().returns(d.$q.when(a.queryResult)),d.datasourceSrv.get=sinon.stub().returns(b),d.service.updateOptions(a.variable),d.$rootScope.$digest()}),b(a)})}var d=new b.ServiceTestContext;beforeEach(module("grafana.services")),beforeEach(d.providePhase(["datasourceSrv","timeSrv","templateSrv","$routeParams"])),beforeEach(d.createService("templateValuesSrv")),describe("update interval variable options",function(){var a={type:"interval",query:"auto,1s,2h,5h,1d",name:"test"};beforeEach(function(){d.service.updateOptions(a)}),it("should update options array",function(){expect(a.options.length).to.be(5),expect(a.options[1].text).to.be("1s"),expect(a.options[1].value).to.be("1s")})}),a("interval variable without auto",function(a){a.setup(function(){a.variable={type:"interval",query:"1s,2h,5h,1d",name:"test"}}),it("should update options array",function(){expect(a.variable.options.length).to.be(4),expect(a.variable.options[0].text).to.be("1s"),expect(a.variable.options[0].value).to.be("1s")})}),a("interval variable with auto",function(a){a.setup(function(){a.variable={type:"interval",query:"1s,2h,5h,1d",name:"test",auto:!0,auto_count:10};var b={from:c(new Date).subtract(7,"days").toDate(),to:new Date};d.timeSrv.timeRange=sinon.stub().returns(b),d.templateSrv.setGrafanaVariable=sinon.spy()}),it("should update options array",function(){expect(a.variable.options.length).to.be(5),expect(a.variable.options[0].text).to.be("auto"),expect(a.variable.options[0].value).to.be("$__auto_interval")}),it("should set $__auto_interval",function(){var a=d.templateSrv.setGrafanaVariable.getCall(0);expect(a.args[0]).to.be("$__auto_interval"),expect(a.args[1]).to.be("12h")})}),a("update custom variable",function(a){a.setup(function(){a.variable={type:"custom",query:"hej, hop, asd",name:"test"}}),it("should update options array",function(){expect(a.variable.options.length).to.be(3),expect(a.variable.options[0].text).to.be("hej"),expect(a.variable.options[1].value).to.be("hop")}),it("should set $__auto_interval",function(){var a=d.templateSrv.setGrafanaVariable.getCall(0);expect(a.args[0]).to.be("$__auto_interval"),expect(a.args[1]).to.be("12h")})}),a("basic query variable",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test"},a.queryResult=[{text:"backend1"},{text:"backend2"}]}),it("should update options array",function(){expect(a.variable.options.length).to.be(2),expect(a.variable.options[0].text).to.be("backend1"),expect(a.variable.options[0].value).to.be("backend1"),expect(a.variable.options[1].value).to.be("backend2")}),it("should select first option as value",function(){expect(a.variable.current.value).to.be("backend1")})}),a("and existing value still exists in options",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test"},a.variable.current={text:"backend2"},a.queryResult=[{text:"backend1"},{text:"backend2"}]}),it("should keep variable value",function(){expect(a.variable.current.text).to.be("backend2")})}),a("and regex pattern exists",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test"},a.variable.regex="/apps.*(backend_[0-9]+)/",a.queryResult=[{text:"apps.backend.backend_01.counters.req"},{text:"apps.backend.backend_02.counters.req"}]}),it("should extract and use match group",function(){expect(a.variable.options[0].value).to.be("backend_01")})}),a("and regex pattern exists and no match",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test"},a.variable.regex="/apps.*(backendasd[0-9]+)/",a.queryResult=[{text:"apps.backend.backend_01.counters.req"},{text:"apps.backend.backend_02.counters.req"}]}),it("should not add non matching items",function(){expect(a.variable.options.length).to.be(0)})}),a("regex pattern without slashes",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test"},a.variable.regex="backend_01",a.queryResult=[{text:"apps.backend.backend_01.counters.req"},{text:"apps.backend.backend_02.counters.req"}]}),it("should return matches options",function(){expect(a.variable.options.length).to.be(1)})}),a("regex pattern remove duplicates",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test"},a.variable.regex="backend_01",a.queryResult=[{text:"apps.backend.backend_01.counters.req"},{text:"apps.backend.backend_01.counters.req"}]}),it("should return matches options",function(){expect(a.variable.options.length).to.be(1)})}),a("with include All glob syntax",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test",includeAll:!0,allFormat:"glob"},a.queryResult=[{text:"backend1"},{text:"backend2"},{text:"backend3"}]}),it("should add All Glob option",function(){expect(a.variable.options[0].value).to.be("{backend1,backend2,backend3}")})}),a("with include all wildcard",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test",includeAll:!0,allFormat:"wildcard"},a.queryResult=[{text:"backend1"},{text:"backend2"},{text:"backend3"}]}),it("should add All wildcard option",function(){expect(a.variable.options[0].value).to.be("*")})}),a("with include all wildcard",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test",includeAll:!0,allFormat:"regex wildcard"},a.queryResult=[{text:"backend1"},{text:"backend2"},{text:"backend3"}]}),it("should add All wildcard option",function(){expect(a.variable.options[0].value).to.be(".*")})}),a("with include all regex values",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test",includeAll:!0,allFormat:"wildcard"},a.queryResult=[{text:"backend1"},{text:"backend2"},{text:"backend3"}]}),it("should add All wildcard option",function(){expect(a.variable.options[0].value).to.be("*")})}),a("with include all glob no values",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test",includeAll:!0,allFormat:"glob"},a.queryResult=[]}),it("should add empty glob",function(){expect(a.variable.options[0].value).to.be("{}")})}),a("with include all regex all values",function(a){a.setup(function(){a.variable={type:"query",query:"apps.*",name:"test",includeAll:!0,allFormat:"regex values"},a.queryResult=[{text:"backend1"},{text:"backend2"},{text:"backend3"}]}),it("should add empty glob",function(){expect(a.variable.options[0].value).to.be("(backend1|backend2|backend3)")})})})});