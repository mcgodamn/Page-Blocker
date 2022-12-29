chrome.runtime.onStartup.addListener(checkBlock)
chrome.runtime.onInstalled.addListener(checkBlock)

function checkBlock() {
	chrome.storage.sync.get('block', function (item) {
		blockObj = item.block;
		if (blockObj == null) return

		if (blockObj.blockWay == 'hard') addBlock();
		else removeBlock();
	});
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