/*! grafana - v1.8.0 - 2014-09-08
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular","config","lodash","jquery","store"],function(a,b,c,d,e){var f=a.module("grafana.controllers");f.controller("GrafanaCtrl",["$scope","alertSrv","grafanaVersion","$rootScope",function(b,f,g,h){b.grafanaVersion="@"===g[0]?"master":g,b.consoleEnabled=e.getBool("grafanaConsole"),h.profilingEnabled=e.getBool("profilingEnabled"),h.performance={loadStart:(new Date).getTime()},b.init=function(){b._=c,h.profilingEnabled&&b.initProfiling(),b.dashAlerts=f,b.grafana={style:"dark"}},b.toggleConsole=function(){b.consoleEnabled=!b.consoleEnabled,e.set("grafanaConsole",b.consoleEnabled)},h.onAppEvent=function(a,b){var c=h.$on(a,b);this.$on("$destroy",c)},h.emitAppEvent=function(a,b){h.$emit(a,b)},h.colors=["#7EB26D","#EAB839","#6ED0E0","#EF843C","#E24D42","#1F78C1","#BA43A9","#705DA0","#508642","#CCA300","#447EBC","#C15C17","#890F02","#0A437C","#6D1F62","#584477","#B7DBAB","#F4D598","#70DBED","#F9BA8F","#F29191","#82B5D8","#E5A8E2","#AEA2E0","#629E51","#E5AC0E","#64B0C8","#E0752D","#BF1B00","#0A50A1","#962D82","#614D93","#9AC48A","#F2C96D","#65C5DB","#F9934E","#EA6460","#5195CE","#D683CE","#806EB7","#3F6833","#967302","#2F575E","#99440A","#58140C","#052B51","#511749","#3F2B5B","#E0F9D7","#FCEACA","#CFFAFF","#F9E2D2","#FCE2DE","#BADFF4","#F9D9F9","#DEDAF7"],b.getTotalWatcherCount=function(){var b=0,c=0,e=d(document.getElementsByTagName("body")),f=function(e){e.data().hasOwnProperty("$scope")&&(c++,a.forEach(e.data().$scope.$$watchers,function(){b++})),a.forEach(e.children(),function(a){f(d(a))})};return f(e),h.performance.scopeCount=c,b},b.initProfiling=function(){var a=0;b.$watch(function(){a++},function(){}),b.onAppEvent("setup-dashboard",function(){a=0,setTimeout(function(){console.log("Dashboard::Performance Total Digests: "+a),console.log("Dashboard::Performance Total Watchers: "+b.getTotalWatcherCount()),console.log("Dashboard::Performance Total ScopeCount: "+h.performance.scopeCount);var c=h.performance.allPanelsInitialized-h.performance.dashboardLoadStart;console.log("Dashboard::Performance - All panels initialized in "+c+" ms");for(var d=window.performance.now(),e=0;30>e;e++)h.$apply();console.log("Dashboard::Performance Root Digest "+(window.performance.now()-d)/30)},3e3)})},b.init()}])});