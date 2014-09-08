/*! grafana - v1.8.0 - 2014-09-08
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular","lodash","kbn","moment"],function(a,b,c){var d=a.module("grafana.services");d.factory("CustomDatasource",function(a){function b(a){this.name=a.name,this.supportMetrics=!0,this.url=a.url}return b.prototype.query=function(b,d){for(var e=c.parseDate(d.range.from).getTime()/1e3,f=c.parseDate(d.range.to).getTime()/1e3,g=[],h=(f-e)/d.maxDataPoints,i=0;3>i;i++){for(var j=100*Math.random(),k=e,l={target:"Series "+i,datapoints:[]},m=0;m<d.maxDataPoints;m++)l.datapoints[m]=[j,k],j+=Math.random()-.5,k+=h;g.push(l)}return a.when({data:g})},b})});