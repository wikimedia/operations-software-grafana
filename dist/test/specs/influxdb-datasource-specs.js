/*! grafana - v1.9.1 - 2015-10-02
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache License */

define(["helpers","features/influxdb/datasource"],function(a){describe("InfluxDatasource",function(){var b=new a.ServiceTestContext;beforeEach(module("grafana.services")),beforeEach(b.providePhase(["templateSrv"])),beforeEach(b.createService("InfluxDatasource")),beforeEach(function(){b.ds=new b.service({urls:[""],user:"test",password:"mupp"})}),describe("When querying influxdb with one target using query editor target spec",function(){var a,c="/series?p=mupp&q=select+mean(value)+from+%22test%22+where+time+%3E+now()-1h+group+by+time(1s)+order+asc",d={range:{from:"now-1h",to:"now"},targets:[{series:"test",column:"value","function":"mean"}],interval:"1s"},e=[{columns:["time","sequence_nr","value"],name:"test",points:[[10,1,1]]}];beforeEach(function(){b.$httpBackend.expect("GET",c).respond(e),b.ds.query(d).then(function(b){a=b}),b.$httpBackend.flush()}),it("should generate the correct query",function(){b.$httpBackend.verifyNoOutstandingExpectation()}),it("should return series list",function(){expect(a.data.length).to.be(1),expect(a.data[0].target).to.be("test.value")})}),describe("When querying influxdb with one raw query",function(){var a,c="/series?p=mupp&q=select+value+from+series+where+time+%3E+now()-1h",d={range:{from:"now-1h",to:"now"},targets:[{query:"select value from series where $timeFilter",rawQuery:!0}]},e=[];beforeEach(function(){b.$httpBackend.expect("GET",c).respond(e),b.ds.query(d).then(function(b){a=b}),b.$httpBackend.flush()}),it("should generate the correct query",function(){b.$httpBackend.verifyNoOutstandingExpectation()})}),describe("When issuing annotation query",function(){var a,c="/series?p=mupp&q=select+title+from+events.backend_01+where+time+%3E+now()-1h",d={from:"now-1h",to:"now"},e={query:"select title from events.$server where $timeFilter"},f=[];beforeEach(function(){b.templateSrv.replace=function(a){return a.replace("$server","backend_01")},b.$httpBackend.expect("GET",c).respond(f),b.ds.annotationQuery(e,d).then(function(b){a=b}),b.$httpBackend.flush()}),it("should generate the correct query",function(){b.$httpBackend.verifyNoOutstandingExpectation()})})})});