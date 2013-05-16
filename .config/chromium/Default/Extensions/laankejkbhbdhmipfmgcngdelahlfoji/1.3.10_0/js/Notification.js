/**
 * Functions showing desktop notifications for elapsed time and Nuclear Option
 *
 * @author              Warren Benedetto <warren@transfusionmedia.com>
 * @since               March 27, 2010
 * @version             1.2.4
 */var Notification=function(){return{settings:[300,60,10],init:function(){this.loadSettings()},get:function(){return this.settings},show:function(e){var t=webkitNotifications.createHTMLNotification("/notifications/"+e+".html");t.show()},isset:function(e){return this.settings.inArray(e)},saveSettings:function(e){this.settings=e,this.setLocal("notificationSettings",JSON.stringify(e))},loadSettings:function(){var e=this.getLocal("notificationSettings");if(e==undefined||e==null||e.length==0)return!1;this.settings=JSON.parse(e)},setLocal:function(e,t){localStorage.setItem(e,t)},getLocal:function(e){return localStorage.getItem(e)},removeLocal:function(e){return localStorage.removeItem(e)}}}();