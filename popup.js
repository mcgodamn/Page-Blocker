document.getElementById("apply").addEventListener("click", applyChange);
chrome.storage.sync.get('blockkey',function(item){
  blockkey = item.blockkey;
  if (blockkey == null) {
  chrome.storage.sync.set({
          blockkey: 'facebook.com youtube.com',
        }, function(){});
  blockkey = 'facebook.com youtube.com';
  }
  document.getElementById('blockkey').value = blockkey;
});

chrome.storage.sync.get('blockway',function(item){
  blockway = item.blockway;
  if (blockway == null) {
  chrome.storage.sync.set({
          blockway: 'hard',
        }, function(){});
  blockway = 'hard';
  }
  if (blockway == 'hard') {
    document.getElementById('hard').checked = true;
  }
  else if (blockway == 'soft') {document.getElementById('soft').checked = true;} 
});

function applyChange()
	{
		var hard = document.getElementById('hard').checked;
    var blockKey = document.getElementById('blockkey').value;
    if (hard) {
      chrome.storage.sync.set({
          blockkey: blockKey,
          blockway: 'hard',
        },function(){
        });
      }
    else
      {
        chrome.storage.sync.set({
          blockkey: blockKey,
          blockway: 'soft',
        }, function() {
        });
      }
	}