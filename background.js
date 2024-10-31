// background.js
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-side-panel") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggleSidePanel" }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Content script not found on this tab:", chrome.runtime.lastError);
          } else {
            console.log("Message sent to content script successfully:", response);
          }
        });
      }
    });
  }
});
