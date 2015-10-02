/*! grafana - v1.9.1 - 2015-10-02
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache License */

define(["angular","app","lodash","components/panelmeta"],function(a,b,c,d){var e=a.module("grafana.panels.custom",[]);b.useModule(e),e.controller("CustomPanelCtrl",["$scope","panelSrv",function(a,b){a.panelMeta=new d({description:"A static text panel that can use plain text, markdown, or (sanitized) HTML"});var e={};c.defaults(a.panel,e),b.init(a)}])});