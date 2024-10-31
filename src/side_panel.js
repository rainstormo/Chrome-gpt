document.getElementById("close-btn").addEventListener("click", () => {
    // Send a message to content.js to hide the iframe panel
    window.parent.postMessage({ action: "hidePanel" }, "*");
  });
  