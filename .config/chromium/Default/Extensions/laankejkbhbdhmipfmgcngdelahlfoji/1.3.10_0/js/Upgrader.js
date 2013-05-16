/**
 * Functions for upgrading versions of extension
 *
 * @author              Warren Benedetto <warren@transfusionmedia.com>
 * @since               February 15, 2011
 * @version             1.0.33
 */function bg(){return chrome.extension.getBackgroundPage()}var Upgrader=function(){return{currentVersion:null,upgradeStack:[],init:function(){this.loadManifest()},loadManifest:function(){$.ajax({type:"GET",url:chrome.extension.getURL("manifest.json"),data:null,success:function(e){var t=JSON.parse(e);Upgrader.currentVersion=t.version,Upgrader.loadUpgrades()}})},loadUpgrades:function(){$.ajax({type:"GET",url:chrome.extension.getURL("js/upgrades/upgrades.json"),data:null,success:function(e){var t=JSON.parse(e);Upgrader.isNewVersion()&&(Upgrader.upgradeStack=Upgrader.buildUpgradeStack(t.versions),Upgrader.doNextUpgrade())}})},buildUpgradeStack:function(e){var t=this.getLastVersion(),n=this.getCurrentVersion(),r=!1,i=[];for(var s in e)e.hasOwnProperty(s)&&(r=s>t&&s<=n,r&&i.push(e[s]));return i},doNextUpgrade:function(){var e=this.upgradeStack.shift();e?this.doUpgrade(e):this.endUpgrades()},doUpgrade:function(e){if(typeof e=="undefined")this.doNextUpgrade();else{var t=document.createElement("script");t.type="text/javascript",t.src="js/upgrades/"+e,t.onload=Upgrader.doNextUpgrade.bind(Upgrader),document.getElementsByTagName("head")[0].appendChild(t)}},endUpgrades:function(){this.setLocal("version",this.getCurrentVersion())},getCurrentVersion:function(){return this.currentVersion},getLastVersion:function(){return this.getLocal("version")},isNewVersion:function(){var e=this.getCurrentVersion(),t=this.getLastVersion();return e!==t},setLocal:function(e,t){localStorage.setItem(e,t)},getLocal:function(e){return localStorage.getItem(e)},removeLocal:function(e){return localStorage.removeItem(e)}}}();