/*! grafana - v1.9.1 - 2015-10-02
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache License */

define(["kbn","lodash"],function(a,b){function c(){var a=this;this.datasource={},this.$element={},this.annotationsSrv={},this.timeSrv=new f,this.templateSrv=new g,this.datasourceSrv={getMetricSources:function(){},get:function(){return a.datasource}},this.providePhase=function(c){return module(function(d){d.value("datasourceSrv",a.datasourceSrv),d.value("annotationsSrv",a.annotationsSrv),d.value("timeSrv",a.timeSrv),d.value("templateSrv",a.templateSrv),d.value("$element",a.$element),b.each(c,function(a,b){d.value(b,a)})})},this.createControllerPhase=function(b){return inject(function(c,d,f,g){a.scope=d.$new(),a.$location=g,a.scope.grafana={},a.scope.panel={},a.scope.row={panels:[]},a.scope.dashboard={},a.scope.dashboardViewState=new e,a.scope.appEvent=sinon.spy(),a.scope.onAppEvent=sinon.spy(),d.colors=[];for(var h=0;50>h;h++)d.colors.push("#"+h);a.$q=f,a.scope.skipDataOnInit=!0,a.scope.skipAutoInit=!0,a.controller=c(b,{$scope:a.scope})})}}function d(){var a=this;a.templateSrv=new g,a.timeSrv=new f,a.datasourceSrv={},a.$routeParams={},this.providePhase=function(c){return module(function(d){b.each(c,function(b){d.value(b,a[b])})})},this.createService=function(b){return inject(function(c,d,e,f){a.$q=c,a.$rootScope=d,a.$httpBackend=e,a.$rootScope.onAppEvent=function(){},a.$rootScope.appEvent=function(){},a.service=f.get(b)})}}function e(){this.registerPanel=function(){}}function f(){this.init=sinon.spy(),this.time={from:"now-1h",to:"now"},this.timeRange=function(b){return b===!1?this.time:{from:a.parseDate(this.time.from),to:a.parseDate(this.time.to)}},this.replace=function(a){return a}}function g(){this.variables=[],this.templateSettings={interpolate:/\[\[([\s\S]+?)\]\]/g},this.data={},this.replace=function(a){return b.template(a,this.data,this.templateSettings)},this.init=function(){},this.updateTemplateData=function(){},this.variableExists=function(){return!1},this.highlightVariablesAsHtml=function(a){return a},this.setGrafanaVariable=function(a,b){this.data[a]=b}}return{ControllerTestContext:c,TimeSrvStub:f,ServiceTestContext:d}});