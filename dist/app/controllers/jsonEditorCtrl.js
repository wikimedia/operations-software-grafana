/*! grafana - v1.8.0 - 2014-09-08
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular","lodash"],function(a){var b=a.module("grafana.controllers");b.controller("JsonEditorCtrl",["$scope",function(b){b.json=a.toJson(b.object,!0),b.canUpdate=void 0!==b.updateHandler,b.update=function(){var c=a.fromJson(b.json);b.updateHandler(c,b.object)}}])});