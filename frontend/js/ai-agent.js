async function askAgent() {
  const text = input.value.trim();
  if (text === "") return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = text;
  chatContainer.appendChild(userMsg);
  input.value = "";

  try {
    // Example: call a cloud API endpoint
    const response = await fetch("https://your-cloud-api.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text })
    });

    const data = await response.json();

    // Show AI reply
    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai";
    aiMsg.textContent = data.answer || "No reply received.";
    chatContainer.appendChild(aiMsg);

    chatContainer.scrollTop = chatContainer.scrollHeight;
  } catch (error) {
    const errorMsg = document.createElement("div");
    errorMsg.className = "message ai";
    errorMsg.textContent = "Error contacting cloud API.";
    chatContainer.appendChild(errorMsg);
  }
}
