async function askAgent() {
  const input = document.getElementById("question");
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';
  scrollToBottom();

  try {
    const response = await fetch("http://localhost:3000/api/agent", { // Use your deployed backend URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message })
    });

    const data = await response.json();
    addMessage(data.reply || "Sorry, no response from AI.", 'ai');
    scrollToBottom();
  } catch (error) {
    addMessage("Error connecting to AI. Try again.", 'ai');
    console.error(error);
  }
}
