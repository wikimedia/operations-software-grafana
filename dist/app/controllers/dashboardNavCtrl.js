/*! grafana - v1.8.0 - 2014-09-08
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular","lodash","moment","config","store","filesaver"],function(a,b,c,d,e){var f=a.module("grafana.controllers");f.controller("DashboardNavCtrl",["$scope","$rootScope","alertSrv","$location","playlistSrv","datasourceSrv","timeSrv",function(b,f,g,h,i,j,k){b.init=function(){b.db=j.getGrafanaDB(),b.onAppEvent("save-dashboard",b.saveDashboard),b.onAppEvent("delete-dashboard",b.deleteDashboard),b.onAppEvent("zoom-out",function(){b.zoom(2)})},b.set_default=function(){e.set("grafanaDashboardDefault",h.path()),g.set("Home Set","This page has been set as your default dashboard","success",5e3)},b.purge_default=function(){e.delete("grafanaDashboardDefault"),g.set("Local Default Clear","Your default dashboard has been reset to the default","success",5e3)},b.saveForSharing=function(){var c=a.copy(b.dashboard);c.temp=!0,b.db.saveDashboard(c).then(function(a){b.share={url:a.url,title:a.title}},function(a){g.set("Save for sharing failed",a,"error",5e3)})},b.passwordCache=function(a){return window.sessionStorage?a?void(window.sessionStorage.grafanaAdminPassword=a):window.sessionStorage.grafanaAdminPassword:null},b.isAdmin=function(){if(!d.admin||!d.admin.password)return!0;if(b.passwordCache()===d.admin.password)return!0;var a=window.prompt("Admin password","");return b.passwordCache(a),a===d.admin.password?!0:(g.set("Save failed","Password incorrect","error"),!1)},b.openSearch=function(){b.emitAppEvent("show-dash-editor",{src:"app/partials/search.html"})},b.saveDashboard=function(){if(!b.isAdmin())return!1;var c=a.copy(b.dashboard);b.db.saveDashboard(c).then(function(a){g.set("Dashboard Saved",'Dashboard has been saved as "'+a.title+'"',"success",5e3),a.url!==h.path()&&(h.search({}),h.path(a.url)),f.$emit("dashboard-saved",b.dashboard)},function(a){g.set("Save failed",a,"error",5e3)})},b.deleteDashboard=function(a,c){if(confirm("Are you sure you want to delete dashboard?")){if(!b.isAdmin())return!1;var d=c.id;b.db.deleteDashboard(d).then(function(a){g.set("Dashboard Deleted",a+" has been deleted","success",5e3)},function(){g.set("Dashboard Not Deleted","An error occurred deleting the dashboard","error",5e3)})}},b.exportDashboard=function(){var c=new Blob([a.toJson(b.dashboard,!0)],{type:"application/json;charset=utf-8"});window.saveAs(c,b.dashboard.title+"-"+(new Date).getTime())},b.zoom=function(a){var b=k.timeRange(),d=b.to.valueOf()-b.from.valueOf(),e=b.to.valueOf()-d/2,f=e+d*a/2,g=e-d*a/2;if(f>Date.now()&&b.to<=Date.now()){var h=f-Date.now();g-=h,f=Date.now()}k.setTime({from:c.utc(g).toDate(),to:c.utc(f).toDate()})},b.styleUpdated=function(){b.grafana.style=b.dashboard.style},b.editJson=function(){b.emitAppEvent("show-json-editor",{object:b.dashboard})},b.openSaveDropdown=function(){b.isFavorite=i.isCurrentFavorite(b.dashboard),b.saveDropdownOpened=!0},b.markAsFavorite=function(){i.markAsFavorite(b.dashboard),b.isFavorite=!0},b.removeAsFavorite=function(){i.removeAsFavorite(b.dashboard),b.isFavorite=!1},b.stopPlaylist=function(){i.stop(1)}}])});