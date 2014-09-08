/*! grafana - v1.8.0 - 2014-09-08
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular","app","lodash"],function(a,b,c){var d=a.module("grafana.controllers");d.controller("SubmenuCtrl",["$scope","$q","$rootScope","templateValuesSrv",function(a,b,d,e){var f={enable:!0};c.defaults(a.pulldown,f),a.init=function(){a.panel=a.pulldown,a.row=a.pulldown,a.variables=a.dashboard.templating.list},a.disableAnnotation=function(a){a.enable=!a.enable,d.$broadcast("refresh")},a.setVariableValue=function(a,b){e.setVariableValue(a,b)},a.init()}])});