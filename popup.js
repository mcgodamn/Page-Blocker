let defaultBlock = {
  'blockKey': 'facebook.com youtube.com',
  'blockWay': 'soft',
};

document.getElementById("apply").addEventListener("click", applyChange);
chrome.storage.sync.get('block', function (item) {
  blockObj = item.block;
  if (blockObj == null) {
    chrome.storage.sync.set({
      block: defaultBlock,
    });
    blockObj = defaultBlock;
  }
  document.getElementById('blockkey').value = blockObj.blockKey;
  document.getElementById('hard').checked = blockObj.blockWay == 'hard';
  document.getElementById('soft').checked = blockObj.blockWay == 'soft';
});

function applyChange() {
  var hard = document.getElementById('hard').checked;
  var blockKey = document.getElementById('blockkey').value;
  if (hard) {
    chrome.storage.sync.set({
      block:{
        'blockKey': blockKey,
        'blockWay': 'hard',
      },
    },
    addBlock);
  }
  else {
    chrome.storage.sync.set({
      block:{
        'blockKey': blockKey,
        'blockWay': 'soft',
      },
    },
    removeBlock);
  }
}

function addBlock() {
  var keywords = blockObj.blockKey.split(/[\s,]+/g);
  var condition = keywords[0];
  for (let i = 1; i < keywords.length; i++) {
    condition += `|${keywords[i]}`;
  }
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      'id': 1,
      'priority': 1,
      'action': {
        'type': 'block'
      },
      'condition': {
        'regexFilter': condition,
        'resourceTypes': [
          'csp_report', 'font', 'image', 'main_frame', 'media', 'object', 'other', 'ping', 'script',
          'stylesheet', 'sub_frame', 'webbundle', 'websocket', 'webtransport', 'xmlhttprequest'
        ]
      }
    }],
    removeRuleIds: [1]
  })
}

function removeBlock() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1]
  })
}