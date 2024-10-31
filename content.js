console.log("Content script loaded");

// Listens for messages from background.js; if the action is "toggleSidePanel", locates the side panel in the DOM to toggle its visibility.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
  if (message.action === "toggleSidePanel") {
    let panel = document.getElementById("side-panel");
    
    // This loads the side panel files (HTML, CSS, JS) into the iframe, creating a self-contained, secure panel
    // that interacts with the user independently of the webpage's content and styles.
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

//Listens for messages from the iframe to hide the side panel (e.g., on close button click).
window.addEventListener("message", (event) => {
  if (event.data.action === "hidePanel") {
    const panel = document.getElementById("side-panel");
    if (panel) {
      panel.style.display = "none";
    }
  }
});

