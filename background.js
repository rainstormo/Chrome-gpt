//Listens for the "toggle-side-panel" command (Alt + J), finds the active tab, and sends a message to the content script to toggle the side panel. 
//Logs an error if the content script is unavailable on the tab.
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
