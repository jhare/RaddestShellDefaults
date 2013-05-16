
var DOLPHIN_TRANS = function(){};

DOLPHIN_TRANS.prototype = 
{
		init : function()
		{
			var that = this;
			chrome.extension.sendMessage({type:'buttonsetting'}, function(resp){
				var show = resp;
				if(show) {
					that.create();
					window.addEventListener("message", function(event) {
					    // We only accept messages from ourselves
					    if (event.source != window)
					      return;
					    
					    var data = event.data;
					    if (data.type && (data.type == "dolphin_appstore")) {
					    	var link =  data.link;
					    	var title = data.title;
					    	var dev_id = data.dev_id;
					    	
					    	//console.log("Content script received appstore: "+ dev_id);
					    	chrome.extension.sendMessage({type:'appstore',data:{url:link, title:title, dev_id:dev_id}}, function(resp) {
					    		if(resp && resp.status == 1) {
					    			alert("Please log in Dolphin Connect extension.");
					    			return;
					    		}
					    		
					    		if(resp && resp.status == 2) {
									alert("Please check 'Dolphin Button' in setting");
					    			return;
					    		}
					    	});
					      //port.postMessage(event.data.text);
					    }
					}, false);
					//console.log("appstore create...");
				}
			});
		},
        create : function()
        {
             var container = document.getElementById('left-stack');
             var extendsdiv = container.children[0];
             var extendsdiv_sec_child = extendsdiv.children[1];
			 var tmpCssStyle,style = document.createElement('style');
         
             if (extendsdiv != null) {
            	 
            	 var dolphin_top = document.getElementById('dolphin_top');
            	 if(dolphin_top != null) {
            		 dolphin_top.parentNode.removeChild(dolphin_top);
            	 }
            	 else {
            		 //create script
                	 var script=document.createElement('script');
                	 var content='';
					 var icon_path = chrome.extension.getURL('images/sentBtn.png');
					 content +='var hideTimer;'
                	 content += 'function dolphin_trans(a){displayDolphinSubMenu("false");var link_e = document.getElementById("left-stack").children[0].children[0]; var img = link_e.children[0].children[0]; window.postMessage({type: "dolphin_appstore", link: link_e.href, title:img.alt,dev_id: a.id}, "*");}';
                	 content += 'function displayDolphinSubMenu(isShow){ var tmp = document.getElementById("dolphin_deviceList");if(!tmp){return;}clearTimeout(hideTimer);tmp.style.display = (isShow=="true"?"block":"none");}';
					 content += 'function hideDolphinSubMenu(){hideTimer=setTimeout(function(){displayDolphinSubMenu("false")},500);}';
                	 content += 'function showDolphinSubMenu(){clearTimeout(hideTimer)}';
                	 script.innerText = content;
                	 document.getElementsByTagName('head')[0].appendChild(script);
                	 
                	 
                   	 tmpCssStyle= "#dolphin_trans a{text-decoration: none;cursor:pointer} #dolphin_trans{position:absolute;margin-top: 4px;height: 25px;z-index:1000;}#dolphin_trans_outer{position:relative;width:126px;height:25px;}#dolphin_trans .dolphin_map_button{display: inline-block;width:95px;height: 21px;background:url("+icon_path+") no-repeat 0 -275px;background-size:275px;font-size:12px;line-height:16px;font-family:'Segoe UI Semibold',Segoe UI,Helvetica, Arial, sans-serif;color:#222222;padding: 5px 0 0 32px;}#dolphin_trans .dolphin_map_button:hover{background-position:0 -366px}#dolphin_trans #dolphin_deviceList{width: 121px;overflow: hidden;-webkit-box-shadow: #CCC 0px 0px 8px;margin:0 0 0 2px;}#dolphin_trans #dolphin_deviceList li a{display: block;height: 25px;background-color: #fff;line-height: 25px;width:100%;overflow:hidden;white-space: nowrap;text-overflow:ellipsis;text-align: center;color: #444444;font-size:12px;font-family:'Segoe UI Semibold',Segoe UI,Helvetica, Arial, sans-serif;}#dolphin_trans #dolphin_deviceList li a:active{background: #379c00 !important;color:#fff}#dolphin_trans #dolphin_deviceList li a:hover{background: #e5efe3;}#dolphin_trans #dolphin_deviceList li{border-bottom:1px solid #ccc;}#dolphin_trans #dolphin_deviceList li:active{border-color:#379c00 !important;}#dolphin_trans #dolphin_deviceList li:hover{border-color:#e5efe3;}#dolphin_trans #dolphin_deviceList li:last-child{border-bottom:none}";
					
                     
            	 }          	 
            	 dolphin_trans = document.createElement('div');
            	 dolphin_trans.setAttribute("id", "dolphin_trans");
				 dolphin_trans_cover = document.createElement('div');
				 dolphin_trans_cover.setAttribute("id", "dolphin_trans_outer");
            	 // var dolphin_button = document.createElement('ul');
            	 // dolphin_button.setAttribute('id', 'dolphin_map_button');
            	 // dolphin_trans.appendChild(dolphin_button);
            	 
            	 // var dolphin_menu_layer = document.createElement('li');
            	 // dolphin_menu_layer.setAttribute('onmouseover', 'displayDolphinSubMenu(this)');
            	 // dolphin_menu_layer.setAttribute('onmouseout', 'hideDolphinSubMenu(this)');
            	 // dolphin_button.appendChild(dolphin_menu_layer);
            	 
            	 var dolphin_menu_top  = document.createElement('a');
				 dolphin_menu_top.setAttribute('onmouseover', 'displayDolphinSubMenu("true")');
				 dolphin_menu_top.setAttribute('onmouseout', 'hideDolphinSubMenu()');
				 dolphin_menu_top.setAttribute('class','dolphin_map_button');
				 dolphin_menu_top.innerHTML = 'Send to Mobile';
				 dolphin_trans.appendChild(dolphin_menu_top);
            	 
            	 //request push device data
            	 chrome.extension.sendMessage({type:'dev_data'}, function(resp){
            		 devs = resp;
            		 if(devs.length > 1){
            			 var dolphin_menu_sec = document.createElement('ul');
						 style.innerHTML = tmpCssStyle;
						 document.getElementsByTagName('head')[0].appendChild(style);
						 dolphin_menu_sec.id = "dolphin_deviceList";
						 dolphin_menu_sec.setAttribute('onmouseout', 'hideDolphinSubMenu()');
						 dolphin_menu_sec.style.display ="none";
            			 dolphin_trans.appendChild(dolphin_menu_sec);
            			 
            			 //create device menu.
            			 for(var idx in devs) {
            				var li = document.createElement('li');
            				var a = document.createElement('a');
							li.setAttribute('onmouseover', 'showDolphinSubMenu()');
            				a.setAttribute('onclick', 'dolphin_trans(this)');
            				a.setAttribute('id', devs[idx].did);
            				a.innerHTML = devs[idx].deviceName;
            				li.appendChild(a);
            				dolphin_menu_sec.appendChild(li);
            			 }
						 dolphin_top = document.createElement('a');
						 dolphin_trans_cover.appendChild(dolphin_trans);
						 dolphin_top.appendChild(dolphin_trans_cover);
						 extendsdiv.insertBefore(dolphin_top,extendsdiv_sec_child);
						 return ;
            		 }
            		 else if(devs.length == 1){
            			 dolphin_menu_top.setAttribute('id', devs[0].did);
            			 dolphin_menu_top.setAttribute('onclick', 'dolphin_trans(this)');
            		 }
            		 else if(devs.length == 0) {
            		 	 	dolphin_menu_top.setAttribute('onclick', 'alert("Please log in with latest Dolphin Browser on your phone.");');
            		 }
            		 dolphin_top = document.createElement('a');
					 dolphin_trans_cover.appendChild(dolphin_trans);
            		 dolphin_top.appendChild(dolphin_trans_cover);
					 tmpCssStyle+=" #dolphin_trans .dolphin_map_button:active{background-position:0 -458px}";
					 style.innerHTML = tmpCssStyle;
					 document.getElementsByTagName('head')[0].appendChild(style);
					 extendsdiv.insertBefore(dolphin_top,extendsdiv_sec_child);
            	 });
            	 
             }
             
        }
};
var devs = null;
var overlay = new DOLPHIN_TRANS();
overlay.init();