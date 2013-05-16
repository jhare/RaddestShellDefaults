/**
 * Functions for blocking pages accessed via outgoing links on blocked sites
 *
 * @author              Warren Benedetto <warren@transfusionmedia.com>
 * @since               April 16, 2010
 * @version             1.1.5
 */var ReferrerMonitor=function(){return{handleBackgroundScriptRequest:function(e,t){var n={};switch(e.message){case"saveOutgoingLink":n={success:ReferrerMonitor.saveOutgoingLink()}}return n},saveOutgoingLink:function(){$("a[href]").each(function(){var e=$(this).attr("href"),t=DomainParser.extractBaseDomain(window.location.href);e.indexOf("javascript:")==-1&&$(this).click(function(){chrome.extension.sendRequest({message:"saveOutgoingLink",outgoingLink:e})})})},isBlockable:function(e,t){return e===undefined||e===null||e.length==0?!1:t===undefined||t===null||t.length<2?!1:e.indexOf(t)>-1}}}();