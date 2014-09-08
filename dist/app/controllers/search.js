/*! grafana - v1.8.0 - 2014-09-08
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular","lodash","config","jquery"],function(a,b,c,d){var e=a.module("grafana.controllers");e.controller("SearchCtrl",["$scope","$rootScope","$element","$location","datasourceSrv","$timeout",function(a,b,c,e,f,g){a.init=function(){a.giveSearchFocus=0,a.selectedIndex=-1,a.results={dashboards:[],tags:[],metrics:[]},a.query={query:"title:"},a.db=f.getGrafanaDB(),g(function(){a.giveSearchFocus=a.giveSearchFocus+1,a.query.query="title:",a.search()},100)},a.keyDown=function(b){if(27===b.keyCode&&a.emitAppEvent("hide-dash-editor"),40===b.keyCode&&a.moveSelection(1),38===b.keyCode&&a.moveSelection(-1),13===b.keyCode){if(a.tagsOnly){var c=a.results.tags[a.selectedIndex];return void(c&&a.filterByTag(c.term))}var f=a.results.dashboards[a.selectedIndex];f&&(e.search({}),e.path("/dashboard/db/"+f.id),setTimeout(function(){d("body").click()}))}},a.moveSelection=function(b){a.selectedIndex=Math.max(Math.min(a.selectedIndex+b,a.resultCount-1),0)},a.goToDashboard=function(a){e.path("/dashboard/db/"+a)},a.shareDashboard=function(b,c,d){d.stopPropagation();var e=window.location.href.replace(window.location.hash,"");a.share={title:b,url:e+"#dashboard/db/"+encodeURIComponent(c)}},a.searchDashboards=function(b){return a.db.searchDashboards(b).then(function(b){a.tagsOnly=b.tagsOnly,a.results.dashboards=b.dashboards,a.results.tags=b.tags,a.resultCount=b.tagsOnly?b.tags.length:b.dashboards.length})},a.filterByTag=function(b,c){a.query.query="tags:"+b+" AND title:",a.search(),a.giveSearchFocus=a.giveSearchFocus+1,c&&(c.stopPropagation(),c.preventDefault())},a.showTags=function(){a.tagsOnly=!a.tagsOnly,a.query.query=a.tagsOnly?"tags!:":"",a.giveSearchFocus=a.giveSearchFocus+1,a.selectedIndex=-1,a.search()},a.search=function(){a.showImport=!1,a.selectedIndex=0,a.searchDashboards(a.query.query)},a.deleteDashboard=function(b,c){c.stopPropagation(),a.emitAppEvent("delete-dashboard",{id:b})},a.addMetricToCurrentDashboard=function(b){a.dashboard.rows.push({title:"",height:"250px",editable:!0,panels:[{type:"graphite",title:"test",span:12,targets:[{target:b}]}]})},a.toggleImport=function(){a.showImport=!a.showImport},a.newDashboard=function(){e.url("/dashboard/file/empty.json")}}]),e.directive("xngFocus",function(){return function(a,b,c){b.click(function(a){a.stopPropagation()}),a.$watch(c.xngFocus,function(a){a&&setTimeout(function(){b.focus();var a=2*b.val().length;b[0].setSelectionRange(a,a)},200)},!0)}}),e.directive("tagColorFromName",function(){function a(a){for(var b=5381,c=0;c<a.length;c++)b=(b<<5)+b+a.charCodeAt(c);return b}return function(c,d){var e=b.isString(c.tag)?c.tag:c.tag.term,f=a(e.toLowerCase()),g=["#E24D42","#1F78C1","#BA43A9","#705DA0","#466803","#508642","#447EBC","#C15C17","#890F02","#757575","#0A437C","#6D1F62","#584477","#629E51","#2F4F4F","#BF1B00","#806EB7","#8a2eb8","#699e00","#000000","#3F6833","#2F575E","#99440A","#E0752D","#0E4AB4","#58140C","#052B51","#511749","#3F2B5B"],h=g[Math.abs(f%g.length)];d.css("background-color",h)}})});