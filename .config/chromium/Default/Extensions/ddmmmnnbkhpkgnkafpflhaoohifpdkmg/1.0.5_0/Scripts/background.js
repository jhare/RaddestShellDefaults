var isOpen = false;
var tabId = "";

/**************** Chrome Events *****************************/
chrome.browserAction.onClicked.addListener(OnClickAction);
chrome.tabs.onRemoved.addListener(OnRemovedAction);

function OnClickAction() {
    if (!isOpen) {
        isOpen = true;
        chrome.tabs.create({
            "url": "S3Browser.html"
        },
        function (tab) {
            tabId = tab.id;
        });
    }
    else
        return;
}

function OnRemovedAction(id, removeInfo) {
    if (tabId == id)
        isOpen = false;
}