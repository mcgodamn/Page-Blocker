var blockway,blockkey;
chrome.storage.sync.get('blockway',function(item){
	blockway = item.blockway;
	if (blockway == null) {
	chrome.storage.sync.set({
          blockway: 'hard',
        }, function(){});
	blockway = 'hard';
}
});

chrome.storage.sync.get('blockkey',function(item){
	blockkey = item.blockkey;
	if (blockkey == null) {
	chrome.storage.sync.set({
          blockkey: 'facebook.com youtube.com',
        }, function(){});
	blockkey = 'facebook.com youtube.com';
}
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
		chrome.storage.sync.get('blockway',function(item){
			blockway = item.blockway;
			if (blockway == null) {
			chrome.storage.sync.set({
		          blockway: 'hard',
		        }, function(){});
			blockway = 'hard';
		}
		});
		
		chrome.storage.sync.get('blockkey',function(item){
			blockkey = item.blockkey;
			if (blockkey == null) {
			chrome.storage.sync.set({
		          blockkey: 'facebook.com youtube.com',
		        }, function(){});
			blockkey = 'facebook.com youtube.com';
		}
		});

		alert(blockway);
    }
});

// chrome.runtime.onMessage.addListener(function(request, sender) {
//     chrome.tabs.update(sender.tab.id, {url: request.redirect});
// });

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var check = false;
	var keywords = blockkey.split(/[\s,]+/g);
	for (keyword in keywords) {
		//alert(keywords[keyword]);
		if((details.url.indexOf(keywords[keyword]) != -1))
		{
			check = true;
			break;
		}
	}
	if (check) 
	{
		if (blockway == 'hard') return {cancel: check};
		else
		{
			return {cancel: false};
			// var b = false;
			// chrome.runtime.sendMessage({redirect: 'https://www.google.com.tw'});
			// // chrome.extension.getURL('stop.html')
		}
	}
  },
  {urls: ["*://*/*"]},
  ["blocking"]
);