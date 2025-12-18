const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Masking function
function maskPhoneNumber(originalNumber) {
  const digits = originalNumber.replace(/\D/g, "");
  if (digits.length < 5) return "Invalid number";
  const lastPart = digits.slice(-5);
  return "111-" + lastPart;  // Custom prefix
}

// Your real phone number
const realPhoneNumber = "03497469638";
const maskedNumber = maskPhoneNumber(realPhoneNumber);

app.post('/api/agent', async (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let replyText = "";

  // Check if user asks about contact number
  if (userMessage.includes("phone") || userMessage.includes("contact") || userMessage.includes("number")) {
    replyText = `You can contact us on WhatsApp: ${maskedNumber}`;
  } else {
    // Use OpenAI for all other queries
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are an AI assistant for Abid Khan's E-Learning Hub.
Answer questions about courses, fees, durations, timings, and schedules clearly.
If asked for contact number, always provide the masked number.
          `
          },
          { role: "user", content: req.body.message }
        ],
        max_tokens: 300
      });

      replyText = response.choices[0].message.content;
    } catch (error) {
      console.error(error);
      replyText = "Sorry, there was an error processing your request.";
    }
  }

  res.json({ reply: replyText });
});

app.listen(3000, () => console.log("AI Agent backend running on port 3000"));
