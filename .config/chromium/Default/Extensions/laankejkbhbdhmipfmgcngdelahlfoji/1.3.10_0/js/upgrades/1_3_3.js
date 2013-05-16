(function(){

    console.log('Upgrading StayFocusd to 1.3.3');

    var blacklistJSON           = localStorage.getItem('blacklist');
    var whitelistJSON           = localStorage.getItem('whitelist');

    var blacklist               = JSON.parse(blacklistJSON) || {};
    var whitelist               = JSON.parse(whitelistJSON) || {};

    chrome.storage.sync.set({

        blacklist               : blacklist,
        whitelist               : whitelist

    },function(){});

}());