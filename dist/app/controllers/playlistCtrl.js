/*! grafana - v1.8.0 - 2014-09-08
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

define(["angular","lodash","config"],function(a,b,c){var d=a.module("grafana.controllers");d.controller("PlaylistCtrl",["$scope","playlistSrv",function(a,d){a.init=function(){a.timespan=c.playlist_timespan,a.loadFavorites()},a.loadFavorites=function(){a.favDashboards=d.getFavorites().dashboards,b.each(a.favDashboards,function(a){a.include=!0})},a.removeAsFavorite=function(b){d.removeAsFavorite(b),a.loadFavorites()},a.start=function(){var c=b.where(a.favDashboards,{include:!0});d.start(c,a.timespan)}}])});