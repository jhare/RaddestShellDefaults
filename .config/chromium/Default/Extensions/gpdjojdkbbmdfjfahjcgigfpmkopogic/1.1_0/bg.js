var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = 'https://ssl.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-12967896-1']);

chrome.browserAction.onClicked.addListener(function(tab) {
  _gaq.push(['_trackEvent', 'chrome_extension', 'clicked']);
  chrome.tabs.executeScript(null, { code: "(function(){var e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('pinMethod','extension');e.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)})();" });
});