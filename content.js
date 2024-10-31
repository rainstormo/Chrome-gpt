// content.js
console.log("Content script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
  if (message.action === "toggleSidePanel") {
    let panel = document.getElementById("side-panel");
    
    // If the panel doesn't exist, create it
    if (!panel) {
      panel = document.createElement("iframe");
      panel.id = "side-panel";
      panel.src = chrome.runtime.getURL("src/side_panel.html");
      panel.style.position = "fixed";
      panel.style.right = "0";
      panel.style.top = "0";
      panel.style.width = "300px";
      panel.style.height = "100%";
      panel.style.border = "none";
      panel.style.zIndex = "1000";
      document.body.appendChild(panel);
    }
    
    // Toggle panel visibility
    if (panel.style.display === "none") {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
    sendResponse({ status: "Panel toggled" });
  }
});

// content.js (Add this part at the end)
window.addEventListener("message", (event) => {
  if (event.data.action === "hidePanel") {
    const panel = document.getElementById("side-panel");
    if (panel) {
      panel.style.display = "none";
    }
  }
});

