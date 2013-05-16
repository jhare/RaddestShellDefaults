/**
 * Primary javascript logic for StayFocusd extension
 *
 * @author              Warren Benedetto <warren@transfusionmedia.com>
 * @since               January 14, 2010
 */function StayFocusd_tick(){StayFocusd.isNewDay()&&StayFocusd.resetElapsedTime(),StayFocusd.elapsedTime=parseInt(StayFocusd.elapsedTime,10)+StayFocusd.interval;var e=StayFocusd.getTotalSecondsRemaining();return Notification.isset(e)&&Notification.show("block"),StayFocusd.isMaxTimeAllowedExceeded()?(StayFocusd.killPage(),!1):(StayFocusd.updateBadge(),StayFocusd.setLocal("elapsedTime",StayFocusd.elapsedTime),!0)}var StayFocusd=function(){return{maxTimeAllowed:10,firstInstallAllowance:60,elapsedTime:0,interval:1,timer:null,maxTimeAllowedExceeded:!1,badgeVisible:!1,apiURL:"http://www.stayfocusd.com",redirectURL:"http://www.stayfocusd.com",currentURL:null,version:null,selectedTabID:null,active:null,infoBarShown:{BLOCKED_BY_REFERRER:{}},init:function(){Upgrader.init(),this.isFirstInstall()&&this.setFirstInstallAllowance(),this.isNewDay()&&this.resetElapsedTime(),ListManager.init(),NuclearOption.init(),Notification.init(),this.maxTimeAllowed=this.getMaxTimeAllowed(),this.elapsedTime=this.getElapsedTime(),this.maxTimeAllowedExceeded=this.isMaxTimeAllowedExceeded();var e=this.getActiveDays();this.setActiveDays(e),chrome.tabs.getSelected(null,function(e){StayFocusd.onTabStateChange(e)}),chrome.tabs.onSelectionChanged.addListener(function(e,t){chrome.tabs.getSelected(null,function(e){StayFocusd.onTabStateChange(e)})}),chrome.tabs.onUpdated.addListener(function(e,t){chrome.tabs.getSelected(null,function(e){StayFocusd.onTabStateChange(e)})}),chrome.tabs.onRemoved.addListener(function(e,t){chrome.tabs.getSelected(null,function(e){e===undefined&&clearInterval(StayFocusd.timer)})}),chrome.windows.onRemoved.addListener(function(e){clearInterval(StayFocusd.timer)}),chrome.windows.onFocusChanged.addListener(function(e,t){chrome.tabs.getSelected(null,function(e){StayFocusd.onTabStateChange(e)}),chrome.windows.getLastFocused(function(e){e!==undefined&&chrome.tabs.getAllInWindow(e.id,function(e){for(var t in e)e.hasOwnProperty(t)&&e[t].selected&&StayFocusd.checkURL(e[t].url)})})}),chrome.windows.onCreated.addListener(function(e,t){chrome.tabs.getAllInWindow(e.id,function(e){for(var t in e)e.hasOwnProperty(t)&&e[t].selected&&StayFocusd.checkURL(e[t].url)})}),chrome.extension.onRequest.addListener(function(e,t,n){var r=StayFocusd.handleContentScriptRequest(e,t);r!==null&&n(r)})},handleContentScriptRequest:function(e,t){var n={};switch(e.message){case"hideInfoBar":n={infoBarHidden:StayFocusd.setLocal("hideInfoBar","true")};break;case"isInfoBarHidden":n={infoBarHidden:StayFocusd.getLocal("hideInfoBar")==="true"};break;case"saveOutgoingLink":n={success:StayFocusd.setLocal("outgoingLink",e.outgoingLink)};break;default:n=null}return n},onTabStateChange:function(e){if(e==undefined)return!1;StayFocusd.currentURL=e.url,StayFocusd.selectedTabID=e.id,StayFocusd.checkURL(e.url);if(!this.isBlockable(e.url)&&!ListManager.isWhitelisted(e.url)&&this.isOutgoingLinksOptionActive()){var t=this.getLocal("outgoingLink");ReferrerMonitor.isBlockable(e.url,t)||chrome.tabs.sendRequest(e.id,{message:"getReferrer"},function(e){e=e||{},e.referrer=typeof e.referrer=="undefined"?"":e.referrer,StayFocusd.checkURL(e.referrer,!0)})}},checkURL:function(e,t){this.isNewDay()&&this.resetElapsedTime(),e=e==undefined?this.currentURL:e;var n=null;clearInterval(this.timer);var r=this.getLocal("outgoingLink");this.isBlockable(e,r)?(n=NuclearOption.isActive()?"img/eye_19x19_nuclear.png":"img/eye_19x19_red.png",chrome.tabs.getSelected(null,function(e){e!==undefined&&(chrome.browserAction.setIcon({tabId:e.id,path:n}),chrome.tabs.sendRequest(e.id,{message:"saveOutgoingLink",target:"ReferrerMonitor"}))}),this.isKillable()?this.killPage():(this.timer=setInterval(StayFocusd_tick,this.interval*1e3),(!this.isBlockable(e)&&ReferrerMonitor.isBlockable(e,r)||t)&&chrome.tabs.getSelected(null,function(e){e!==undefined&&StayFocusd.hasInfoBarBeenShown(e.url,"BLOCKED_BY_REFERRER")===!1&&StayFocusd.showInfoBar(e,"BLOCKED_BY_REFERRER")}))):ListManager.isWhitelisted(e)?chrome.tabs.getSelected(null,function(e){e!==undefined&&chrome.browserAction.setIcon({tabId:e.id,path:"img/eye_19x19_green.png"})}):(n=NuclearOption.isActive()?"img/eye_19x19_nuclear.png":"img/eye_19x19_blue.png",chrome.tabs.getSelected(null,function(e){e!==undefined&&chrome.browserAction.setIcon({tabId:e.id,path:n})}))},isOutgoingLinksOptionActive:function(){var e=this.getLocal("countdownForOutgoingLinks");return e==""||e==undefined||e==null?!0:e=="true"},hasInfoBarBeenShown:function(e,t){var n=encodeURIComponent(e);return this.infoBarShown[t][n]===!0},showInfoBar:function(e,t){this.getLocal("hideInfoBar")!=="true"&&chrome.tabs.sendRequest(e.id,{message:"show",msgType:t,target:"InfoBar"},function(n){var r=encodeURIComponent(e.url);StayFocusd.infoBarShown[t][r]=!0})},isKillable:function(){return this.isMaxTimeAllowedExceeded()||NuclearOption.isActive()},isProtectedURL:function(e){return e===null||e==undefined||e.length==0?!1:e.indexOf(this.redirectURL)===0?!0:e.indexOf("paypal")>=0?!0:e.indexOf("chrome")>=0&&e.indexOf("chrome")<e.indexOf("://")&&(e.indexOf("sf")>-1||e.indexOf("devtools")>-1)?!0:!1},isBlockable:function(e,t){if(this.isProtectedURL(e))return!1;if(e==null||e==undefined||e=="")return!1;if(this.isActive()===!1)return!1;var n=ListManager.isBlacklisted(e),r=ListManager.isWhitelisted(e),i=NuclearOption.isBlockable(n,r);if(i)return!0;if(n&&!r)return!0;if(n&&r){var s=ListManager.getMatchFromList(e,"black"),o=ListManager.getMatchFromList(e,"white");return s===e&&o!==e?!0:s!==e&&o===e?!1:DomainParser.isMoreGeneralURL(o,s)}return r||NuclearOption.isActive()&&!i?!1:this.isOutgoingLinksOptionActive()&&typeof t=="string"&&t.length>0?ReferrerMonitor.isBlockable(e,t):!1},isNewDay:function(){var e=!1,t=new Date,n=t.getTime(),r=this.getLocal("resetTimestamp"),i=this.getResetTime();if(r==undefined||r==null||r==""){var s=i.split(":"),o=parseInt(s[0],10),u=parseInt(s[1],10),a=new Date(t.toDateString()+" "+o+":"+u);r=a.getTime(),this.updateResetTimestamp(i)}return r=parseInt(r),n=parseInt(n),n>r&&(e=!0,this.updateResetTimestamp(i)),e},getElapsedTime:function(){var e=this.getLocal("elapsedTime");if(isNaN(e)||e==undefined)e=0,this.resetElapsedTime();return e},resetElapsedTime:function(){var e=this.getDateString();this.setLocal("lastReset",e),this.setLocal("elapsedTime",0),this.maxTimeAllowedExceeded=!1,this.elapsedTime=0},updateBadge:function(){var e=this.getTotalSecondsRemaining(),t=!1,n=[];e<=30?(t=!0,n=[200,10,10,100]):e<=60&&(t=!0,n=[255,245,0,100]),t===!0?StayFocusd.isBlockable(this.currentURL)?(chrome.browserAction.setBadgeBackgroundColor({tabId:StayFocusd.selectedTabID,color:n}),chrome.browserAction.setBadgeText({tabId:StayFocusd.selectedTabID,text:e.toString()}),this.badgeVisible=!0):chrome.browserAction.setBadgeText({tabId:StayFocusd.selectedTabID,text:""}):StayFocusd.badgeVisible===!0&&(chrome.browserAction.setBadgeText({tabId:StayFocusd.selectedTabID,text:""}),this.badgeVisible=!1)},killPage:function(){return clearInterval(this.timer),chrome.windows.getLastFocused(function(e){e!==undefined&&chrome.tabs.getAllInWindow(e.id,function(e){for(var t in e)e.hasOwnProperty(t)&&e[t].selected&&(StayFocusd.isMaxTimeAllowedExceeded()||NuclearOption.isActive()&&!NuclearOption.hasSmartBomb()?e[t].pinned===!0?chrome.tabs.sendRequest(e[t].id,{message:"killPage",redirectURL:StayFocusd.redirectURL}):chrome.tabs.update(e[t].id,{url:StayFocusd.redirectURL+"?background"}):NuclearOption.isActive()&&NuclearOption.hasSmartBomb()&&chrome.tabs.sendRequest(e[t].id,{message:"smartBomb",smartBomb:NuclearOption.getSmartBomb(),target:"SmartBomb"}))})}),!1},getMaxTimeAllowed:function(){var e=this.getLocal("maxTimeAllowed");if(e==undefined||e==null||e=="")e=this.maxTimeAllowed;return e=parseInt(e,10),e},setMaxTimeAllowed:function(e){e=parseInt(e,10);var t=this.getTotalSecondsRemaining(),n=!0;if(this.isMaxTimeAllowedExceeded())return alert(chrome.i18n.getMessage("cannotChangeTimeOnceTimeIsUp")),!1;if(e>=1440)return alert(chrome.i18n.getMessage("cannotSetMoreThan1440Mins")),!1;if(e<=0)return alert(chrome.i18n.getMessage("cannotSetTimeToZeroOrLess")),!1;if(this.elapsedTime/60>=e){alert(chrome.i18n.getMessage("allSitesBlockedImmediately"));if(n===!1)return!1}if(e>this.maxTimeAllowed){if(this.isProductivityBypassActive())return alert(chrome.i18n.getMessage("completeChallengeBeforeIncreasingTime")),!1;t<180?(n=confirm(chrome.i18n.getMessage("lessThanThreeMins")),n===!0&&(n=confirm(chrome.i18n.getMessage("lessThanThreeMins2"))),n===!0&&(n=confirm(chrome.i18n.getMessage("lessThanThreeMins3"))),n===!0&&(n=confirm(chrome.i18n.getMessage("lessThanThreeMins4"))),n===!0&&(n=confirm(chrome.i18n.getMessage("lessThanThreeMins5"))),n===!0&&(n=confirm(chrome.i18n.getMessage("lessThanThreeMins6"))),n===!0&&(n=confirm(chrome.i18n.getMessage("lessThanThreeMins7"))),n===!0&&(n=confirm(chrome.i18n.getMessage("lessThanThreeMins8"))),n===!0&&(alert(chrome.i18n.getMessage("tellingYourMom")),window.open("http://www.sas.calpoly.edu/asc/ssl/procrastination.html"))):(n=confirm(chrome.i18n.getMessage("maybeYouShouldReconsider")),n===!0&&(n=confirm(chrome.i18n.getMessage("onlyHurtingYourself"))),n===!0&&alert(chrome.i18n.getMessage("meow")))}if(n===!0){var r=chrome.i18n.getMessage("settingsUpdated");e<this.maxTimeAllowed&&(r=chrome.i18n.getMessage("givingLessTime")+"\n\n"+r),this.maxTimeAllowed=e,this.setLocal("maxTimeAllowed",e),alert(r)}return n},isMaxTimeAllowedExceeded:function(){return this.maxTimeAllowedExceeded===!0?!0:this.elapsedTime/60>this.maxTimeAllowed?(this.maxTimeAllowedExceeded=!0,!0):!1},getTotalSecondsRemaining:function(){var e=this.maxTimeAllowed*60-this.elapsedTime;return e>=0?e:0},getDisplayTimer:function(){var e=this.getTotalSecondsRemaining();if(e==0)return"00:00:00";var t=Math.floor(e/3600),n=Math.floor((e-t*3600)/60),r=e-(t*3600+n*60);return t=DateUtils.toTwoDigits(t),n=DateUtils.toTwoDigits(n),r=DateUtils.toTwoDigits(r),t+":"+n+":"+r},getDateString:function(){var e=new Date,t=e.getMonth()+1,n=e.getDate(),r=e.getFullYear();return r+"-"+t+"-"+n},setActiveDays:function(e){var t=null;e.length===0?t="none":t=e.join("|"),this.setLocal("activeDays",t)},getActiveDays:function(){var e=this.getLocal("activeDays");return e=="none"?[]:e==undefined||e==null||e.length===0?[0,1,2,3,4,5,6]:e.split("|")},isActiveDay:function(){var e=new Date,t=e.getDay(),n=this.getActiveDays();return n==undefined||n==null||n.length===0?!1:n.inArray(t)},setActiveHours:function(e,t){this.setLocal("activeHours",e+"|"+t)},getActiveHours:function(){var e=!1,t=!1,n=this.getActiveHoursQueue();if(n!==!1){var r=new Date,i=r.getTime();if(i>n.timestamp||this.isFirstInstallAllowanceActive())e=n.startTime,t=n.endTime,this.setActiveHours(e,t),this.clearActiveHoursQueue()}if(e===!1&&t===!1){var s=this.getLocal("activeHours");if(s==undefined||s==null||s=="")this.setActiveHours("00:00","23:59"),s=this.getLocal("activeHours");var o=s.split("|");e=o[0],t=o[1]}var u=e.split(":"),a=t.split(":");return{startTime:e,endTime:t,startHour:u[0],startMin:u[1],startHourInt:parseInt(u[0],10),startMinInt:parseInt(u[1],10),endHour:a[0],endMin:a[1],endHourInt:parseInt(a[0],10),endMinInt:parseInt(a[1],10)}},isActiveHour:function(){var e=this.getActiveHours(),t=new Date,n=t.getHours(),r=t.getMinutes();return this.isStartTimeLater(e)===!0?this.isBetween(n,r,e.startHourInt,e.startMinInt,23,59)||this.isBetween(n,r,0,0,e.endHourInt,e.endMinInt):this.isBetween(n,r,e.startHourInt,e.startMinInt,e.endHourInt,e.endMinInt)},isBetween:function(e,t,n,r,i,s){return e>n&&e<i?!0:e==n&&e==i?t>=r&&t<=s:e==n&&t>=r?!0:e==i&&t<=s?!0:!1},isStartTimeLater:function(e){return e.startHourInt==e.endHourInt&&e.startMinInt>=e.endMinInt?!0:e.startHourInt>e.endHourInt?!0:!1},setActiveHoursQueue:function(e,t){var n=new Date,r=n.getTime()+DateUtils.hoursToMilliseconds(24),i=r+"|"+e+"|"+t;this.setLocal("activeHoursQueue",i)},getActiveHoursQueue:function(){var e=this.getLocal("activeHoursQueue");if(e==undefined||e==null||e=="")return!1;var t=e.split("|"),n={};return n.timestamp=t[0],n.startTime=t[1],n.endTime=t[2],n},clearActiveHoursQueue:function(){this.removeLocal("activeHoursQueue")},isActive:function(){return NuclearOption.isActive()===!0?!0:this.isActiveDay()===!0&&this.isActiveHour()===!0},updateResetTimestamp:function(e){var t=e.split(":"),n=parseInt(t[0],10),r=parseInt(t[1],10),i=new Date((new Date).toDateString()+" "+n+":"+r),s=i.getTime()+864e5;this.setLocal("resetTimestamp",s)},setResetTime:function(e){this.setLocal("resetTime",e)},getResetTime:function(){var e=this.getLocal("resetTime"),t=this.getResetTimeQueue();if(t!==!1){var n=new Date,r=n.getTime();if(r>t.timestamp||this.isFirstInstallAllowanceActive())e=t.resetTime,this.setResetTime(e),this.clearResetTimeQueue(),this.updateResetTimestamp(e)}if(e==undefined||e==null||e=="")this.setResetTime("00:00"),e=this.getLocal("resetTime"),this.updateResetTimestamp(e);return e},setResetTimeQueue:function(e){var t=new Date,n=t.getTime()+DateUtils.hoursToMilliseconds(24),r=n+"|"+e;this.setLocal("resetTimeQueue",r)},getResetTimeQueue:function(){var e=this.getLocal("resetTimeQueue");if(e==undefined||e==null||e=="")return!1;var t=e.split("|"),n={};return n.timestamp=t[0],n.resetTime=t[1],n},clearResetTimeQueue:function(){this.removeLocal("resetTimeQueue")},setProductivityBypass:function(){this.setLocal("productivityBypass","true")},clearProductivityBypass:function(){this.removeLocal("productivityBypass")},isProductivityBypassActive:function(){return this.getLocal("productivityBypass")=="true"},isFirstInstall:function(){return typeof this.getLocal("firstInstallDate")!="string"},isActivityMonitorDisabled:function(){return this.getLocal("disableActivityMonitor")==="true"},setFirstInstallAllowance:function(){var e=new Date;this.setLocal("firstInstallDate",e.toDateString()),e.setMinutes(e.getMinutes()+this.firstInstallAllowance),this.setLocal("firstInstallAllowanceExpiration",e.getTime())},isFirstInstallAllowanceActive:function(){var e=this.getLocal("firstInstallAllowanceExpiration"),t=new Date;return e>t.getTime()},setLocal:function(e,t){localStorage.setItem(e,t)},getLocal:function(e){return localStorage.getItem(e)},removeLocal:function(e){return localStorage.removeItem(e)},localizeHTML:function(e){var t=e.getElementsByTagName("*");for(var n=0;n<t.length;n++)t[n].dataset&&t[n].dataset.i18n&&(t[n].innerHTML=chrome.i18n.getMessage(t[n].dataset.i18n))}}}();Array.prototype.removeByValue=function(e){this.indexOf(e)>=0&&this.splice(this.indexOf(e),1)},Array.prototype.inArray=function(e){for(var t in this)if(this.hasOwnProperty(t)&&this[t]==e)return!0;return!1};