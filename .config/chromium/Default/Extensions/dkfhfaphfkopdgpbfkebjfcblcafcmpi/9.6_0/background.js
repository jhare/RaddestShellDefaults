function _6d3fd5861333f0e7a869b9df63477e5bd1b6a239d6713c0203528addbbf93f7093e0a2c232b33178Orig(){oauth.authorize(function(){_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("on google contacts - oauth.authorize()");oauth.sendSignedRequest("http://www.google.com/m8/feeds/contacts/default/full",_b1ff83a6024e50ccbb732f5b85745b0867acd3c09879d284197965980b2d4432db5dcc29931d3cb0,{parameters:{alt:"json","max-results":1E4}})})}
function _a48b203b6d5cc28c07aa5a057b9d7aa7fd1b7614d292602074edaaff1b3e9d6a2d5ab424ac581f82(){console.log("NON-WEBAPP-HEARTBEAT-CHECK");console.log("Current polling frequency is: "+poll_freq);checkLastMightyNetworkPing()}console.log("----------------- Starting Background Script ** -----------");var globalHeartbeatInterval=setInterval(_a48b203b6d5cc28c07aa5a057b9d7aa7fd1b7614d292602074edaaff1b3e9d6a2d5ab424ac581f82,1E4);_gaq.push(["_trackEvent","Background","Startup-BG-Script","",1]);
var token,time_last_channel_token_obtained=0,time_last_success_mighty_ping=new Date,globalContactsSyncMethod="SYNC_PHONE",username_prefix_jstrg_purpose,calling_from_chrome_extension=!0,capi_rollout_factor=3.8;console.log("capi rollout factor is "+capi_rollout_factor);
var GOOGLE_CONTACTS_OAUTH_STATUS="UNKNOWN",oauth=ChromeExOAuth.initBackgroundPage({request_url:"https://www.google.com/accounts/OAuthGetRequestToken",authorize_url:"https://www.google.com/accounts/OAuthAuthorizeToken",access_url:"https://www.google.com/accounts/OAuthGetAccessToken",consumer_key:"anonymous",consumer_secret:"anonymous",scope:"http://www.google.com/m8/feeds/",app_name:"MightyText - Contacts Sync"}),contacts_bkg_page=null,contacts_autocomplete_per_unique_phone_num=null,num_consecutive_internet_connection_failures=
0,notify_android_app_install_once=!1,debug_mode=1;_3b0a65b2762a720f13071fc19d875c5b11736a35b4c6415dbd9336d9979899193072fe9e0b9314b6(!1);var google_login_status=!1,google_username_currently_logged_in="",login_and_beta_ready=!1,extra_login_status_info="";_85b9f6bf757493060c14d76373e79974a1c9a909635c3f2335ce25161381b7fe50494b8dc6f5f458();var GOOGLE_CONTACTS_OAUTH_STATUS="UNKNOWN",should_get_contacts_token_in_new_tab=!0;
_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("Google Contacts Token Status: "+GOOGLE_CONTACTS_OAUTH_STATUS);function _85b9f6bf757493060c14d76373e79974a1c9a909635c3f2335ce25161381b7fe50494b8dc6f5f458(){window.setTimeout(function(){_69d14067a79160751977b9a7ce012138717203098b1c3aa0234bcd02351d0ff71fc6bb855aba7d23(1,!0)},300)}
function _b1ff83a6024e50ccbb732f5b85745b0867acd3c09879d284197965980b2d4432db5dcc29931d3cb0(b){contacts_bkg_page=[];contacts_autocomplete_per_unique_phone_num=[];b=JSON.parse(b);for(var a=0,c;c=b.feed.entry[a];a++){var d={name:c.title.$t,id:c.id.$t,emails:[],phonenums:[]},h={label:c.title.$t,value:""};if(c.gd$email)for(var g=c.gd$email,f=0,e;e=g[f];f++)d.emails.push(e.address);d.name||(d.name=d.emails[0]||"<Unknown>");if(c.gd$phoneNumber){g=c.gd$phoneNumber;for(f=0;f<g.length;f++)e=g[f],d.phonenums.push(e.$t),
h.label=d.name+" "+e.$t,h.value=e.$t,contacts_autocomplete_per_unique_phone_num.push({label:d.name+" "+e.$t,value:e.$t})}c.gd$phoneNumber&&contacts_bkg_page.push(d)}}function _040e7d229080fe1b7a7f04aef7081df3d5f7a4e9a3163b7935e1d7c8f0fb32ed0cd957e1e3bf7518GoogleOpenID(){oauth.clearTokens();_3b0a65b2762a720f13071fc19d875c5b11736a35b4c6415dbd9336d9979899193072fe9e0b9314b6(!1)}var msgcount="",simplevalidation="",db,msgcount2="",msgList="",PendingSMSArray=[];
chrome.extension.onRequest.addListener(function(b,a,c){_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b(a.tab?"from a content script:"+a.tab.url:"from the extension");"user_invoked_popup_so_force_google_login_check"==b.purpose&&(console.log("* User Clicked Popup icon in extension**  Now check if a user is logged in already"),console.log(extra_login_status_info),"WEBAPP_BETA"==extra_login_status_info?console.log("YES - user is a web app user. Don't do anything extra (dont call checkGoogleLoginTokenAndSetUsername)"):
(console.log("user does not have extra_login info set - so likely not signed in before, so check if they are now"),_69d14067a79160751977b9a7ce012138717203098b1c3aa0234bcd02351d0ff71fc6bb855aba7d23()),c({reply:"success"}))});
chrome.extension.onRequest.addListener(function(b,a,c){_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b(a.tab?"from a content script:"+a.tab.url:"from the extension");"call_from_popup_to_check_contact_info"==b.greeting&&(should_get_contacts_token_in_new_tab=!1,_6d3fd5861333f0e7a869b9df63477e5bd1b6a239d6713c0203528addbbf93f7093e0a2c232b33178(),c({farewell:contacts_bkg_page,autocomplete_contacts_list:contacts_autocomplete_per_unique_phone_num,google_contacts_token_status:GOOGLE_CONTACTS_OAUTH_STATUS}))});
chrome.extension.onRequest.addListener(function(b,a,c){_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b(a.tab?"from a content script:"+a.tab.url:"from the extension");"get_new_g_contacts_token_call_from_popup"==b.purpose&&(should_get_contacts_token_in_new_tab=!0,_6d3fd5861333f0e7a869b9df63477e5bd1b6a239d6713c0203528addbbf93f7093e0a2c232b33178Orig(),c({myreply:"yo yo"}))});
chrome.extension.onRequest.addListener(function(b,a,c){_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b(a.tab?"from a content script:"+a.tab.url:"from the extension");"popup_checking_current_google_login_state"==b.purpose&&c({google_login_status_from_bg_page:google_login_status,login_and_beta_ready_from_bg_page:login_and_beta_ready,google_username_currently_logged_in_from_bg_page:google_username_currently_logged_in,extra_login_status_info_from_bg_page:extra_login_status_info})});
chrome.extension.onRequest.addListener(function(b,a,c){_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b(a.tab?"from a content script:"+a.tab.url:"from the extension");"set_quick_polling_outbound_message"==b.purpose&&(_07e9caa5baaf30fdb44691d7d12418bd0acf53a75427674f55437297c338deadbb57ec839b5a6ddd("Outbound Message being sent, lower polling to check for ACK faster",2E3),c({myreply:"sent request to set polling to 2000"}))});
function _1ab5a1b8b5e15644f372cb5ea3114befc07a8b7d8351a2027976ef549f0fc2416068f1b883b3824e(){}function _d0f1f76ab5b7c8341a1ee2086782d130d033d73098342528b574fdcb56460a0d539a47add6b1d040(b,a){log.innerHTML+="<p>"+a.message+"</p>"}function OLD__4a0391f72a976a2c9cd944183f0c285736423751039479c0dfd5ce1d9e9d98cd21f3eb762309b06d(b,a){_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("Error during SQL insert: "+a.msg)}
var default_poll_freq=17E3,highest_poll_freq=7E4,poll_freq=default_poll_freq,consecutive_polls_without_message_activity=0,total_aggregate_polls=0,poll_state="START";db=openDatabase("Texty","1.0","Texty-SMS",2E5);localStorage.isInitialized||(localStorage.isActivated=!0,localStorage.frequency=1,localStorage.isInitialized=!0);_3a5c6e75a23a68a0a08e68245dab4f92e034e9f41d23432b4c66cf0eea9abc6df51f6223ca671ed7();
if(webkitNotifications){var interval=0,currentGlobalIntervalID=setInterval(_83970f4708993137bf6fdafd56f7f3d487d07e56659a9221e3acaf7b6979b98a51200e60c73b5740,poll_freq);_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("STARTUP --  ** Setting polling to: "+poll_freq)}else chrome.tabs.create({url:"error.html"});
function _83970f4708993137bf6fdafd56f7f3d487d07e56659a9221e3acaf7b6979b98a51200e60c73b5740(){interval++;JSON.parse(localStorage.isActivated)&&localStorage.frequency<=interval&&(consecutive_polls_without_message_activity++,total_aggregate_polls++,_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("------------------------------------------------"),_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("At START of POLL at "+Date()),_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("Poll State is: "+
poll_state),_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("Current polling frequency is: "+poll_freq),_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("# of consecutive polls without activity is: "+consecutive_polls_without_message_activity),_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("TOTAL AGGREGATE POLLS: "+total_aggregate_polls),_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("Google Login Status is: "+
google_login_status),4<consecutive_polls_without_message_activity&&"OK-NORMAL"==poll_state&&_07e9caa5baaf30fdb44691d7d12418bd0acf53a75427674f55437297c338deadbb57ec839b5a6ddd("*No new incoming message Activity in a while...increase polling freq...",Math.min(highest_poll_freq,1.05*poll_freq)),!0==google_login_status&&!0==network_connection_status&&!0==login_and_beta_ready?(_216b0f8f081043b4920a254bbb54286081e2cf09987c951a467e836ca99990d38be51ad35d623e5a(),"OK-NORMAL"!=poll_state&&(poll_state="OK-NORMAL",
console.log("stopping this Interval and restarting to default - g user logged in ...setting poll frequency to DEFAULT"),poll_freq=default_poll_freq*capi_rollout_factor,interval=0,clearInterval(currentGlobalIntervalID),window.setInterval(function(){_83970f4708993137bf6fdafd56f7f3d487d07e56659a9221e3acaf7b6979b98a51200e60c73b5740()},poll_freq))):(console.log("user not logged in -- reason is "+google_username_currently_logged_in),_69d14067a79160751977b9a7ce012138717203098b1c3aa0234bcd02351d0ff71fc6bb855aba7d23(),
_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("Network Connection Status: "+network_connection_status),!1==network_connection_status?(poll_state="WAITING-FOR-NETWORK",_07e9caa5baaf30fdb44691d7d12418bd0acf53a75427674f55437297c338deadbb57ec839b5a6ddd("Waiting for Network",2E4)):"WAITING-FOR-USER-PROPER-AUTH"!=poll_state&&(poll_state="WAITING-FOR-USER-PROPER-AUTH",_07e9caa5baaf30fdb44691d7d12418bd0acf53a75427674f55437297c338deadbb57ec839b5a6ddd("Waiting for proper User Auth",
4E4))))}
function _07e9caa5baaf30fdb44691d7d12418bd0acf53a75427674f55437297c338deadbb57ec839b5a6ddd(b,a){console.log(b+"...Stopping this Interval and resetting Polling...setting poll frequency to "+a);poll_freq=a;poll_freq*=capi_rollout_factor;console.log("ACTUALLY setting to "+poll_freq+"...based on CAPI rollout factor of "+capi_rollout_factor);clearInterval(currentGlobalIntervalID);consecutive_polls_without_message_activity=0;currentGlobalIntervalID=window.setInterval(function(){_83970f4708993137bf6fdafd56f7f3d487d07e56659a9221e3acaf7b6979b98a51200e60c73b5740()},poll_freq)}
function _216b0f8f081043b4920a254bbb54286081e2cf09987c951a467e836ca99990d38be51ad35d623e5a(){_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("Checking MightyText at "+Date());_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("google_login_status is: "+google_login_status);_3d7013ecd340ba44ef2cdd5fe56fc75232320b66a4e2acbacc12257163e4905d14d56e5489a3921d(!0);_ca53eacdad4bc00d24226b4b6a9ea8057f3c9713380247e2713ea05e9bc001ebe20c2bb498cd476b()}
function checkLastMightyNetworkPing(){var b=((new Date).getTime()-time_last_success_mighty_ping.getTime())/1E3;_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("--------------\x3e Seconds Since LAST MightyText network ping: "+b);360<b&&(console.error("---\x3e has been a long time since last MT ping -- try to contact google.com first"),$.ajax({type:"GET",url:"https://accounts.google.com/latitude/mobile_phone-16.gif",cache:!1,success:function(){console.log("Network ping to Google -- fine...");
_gaq.push(["_trackEvent","CRX-Background","Error","Forced-Reload-CRX",1]);console.log("google login status is true -- will reload CRX BG in 10 seconds");window.setTimeout(function(){window.location.reload()},1E4)}}))}
function _ca53eacdad4bc00d24226b4b6a9ea8057f3c9713380247e2713ea05e9bc001ebe20c2bb498cd476b(){if(0==time_last_channel_token_obtained)console.log("no channel opened yet in this session, go open one"),_0f2980b9da943955552c0badec8dd3e8ae6765ce84852dbc90b9261ba5f8af526f64a8f28d9a3e5b();else{var b=((new Date).getTime()-time_last_channel_token_obtained.getTime())/1E3;_23a72b4b1452794c76a05bc6804f1ad8aaf421813a425331cd8500cd360b87ec760ca2e0bd6ddd2b("Seconds Since LAST CHANNEL TOKEN OBTAINED: "+b);13500<b?
(console.log("has been > 3.75 hours, get a new channel token"),_0f2980b9da943955552c0badec8dd3e8ae6765ce84852dbc90b9261ba5f8af526f64a8f28d9a3e5b()):console.log("has NOT been > 3.75 hours since last CAPI channel token was retrieved, no need to get a new one.")}}function _0724587eb73684d04f4ac251e3bf3d69cb23eff4d04133bd840b69ee1554e111912b419928dea133(b,a){return Math.round(b*Math.pow(10,a))/Math.pow(10,a)};