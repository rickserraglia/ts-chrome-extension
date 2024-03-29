export {};

console.log(
	'Live now; make now always the most precious time. Now will never come again.',
);

chrome.action.onClicked.addListener((tab) => {
	console.log(`action clicked: `);

	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: () => {
			const iframeExists = document.getElementById('extension-iframe');

			if (iframeExists) {
				iframeExists.remove();
				return;
			}

			const iframe = document.createElement('iframe');
			iframe.id = 'extension-iframe';
			iframe.style.position = 'fixed';
			iframe.style.top = '10px';
			iframe.style.right = '10px';
			iframe.style.zIndex = '99999999';
			iframe.style.border = 'none';
			iframe.style.borderRadius = '8px';

			iframe.src = chrome.runtime.getURL('/tabs/index.html');
			iframe.name = 'extension-iframe';

			document.body.appendChild(iframe);

			// on click outside iframe, remove it
			document.addEventListener('click', (e) => {
				if (e.target !== iframe) {
					iframe.remove();

					// remove event listener
					document.removeEventListener('click', () => {});
				}
			});
		},
	});
});

// /* Note if you're building for firefox or mv2 in general, chrome.action will be undefined so you have to do something like this:

// @see https://stackoverflow.com/questions/70216500/chrome-action-is-undefined-migrating-to-v3-manifest

// const handleClick = (tab) => {
//   console.log("clicked", tab.id);
//   if (!tab.id) throw new Error("tab id not found");
//   chrome.tabs.sendMessage(tab.id, {
//     name: "show-dialog"
//   });
// };

// if (chrome.action != undefined) {
//   chrome.action.onClicked.addListener(handleClick);
// } else {
//   chrome.browserAction.onClicked.addListener(handleClick);
// }
// */

// chrome.commands.onCommand.addListener((command) => {
// 	if (command === 'test') {
// 		console.log(`test command: `);
// 	}
// });
