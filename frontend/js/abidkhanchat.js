// abidkhanchat.js
// Frontend logic to connect with Firebase Cloud Function

async function sendMessage(text) {
  try {
    const response = await fetch(
      "https://us-central1-abid-hub-chat.cloudfunctions.net/chat", // Replace with your actual Firebase Function URL
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text })
      }
    );

    const data = await response.json();
    displayMessage("You", text);
    displayMessage("Agent", data.answer);
  } catch (error) {
    console.error("Error contacting Firebase:", error);
    displayMessage("Agent", "⚠️ Error: Could not reach backend.");
  }
}

function displayMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.className = sender.toLowerCase() + "-message";
  msg.textContent = `${sender}: ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("chat-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (text) {
    sendMessage(text);
    input.value = "";
  }
});
