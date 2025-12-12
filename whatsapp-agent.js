const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Twilio credentials
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

// Masking function
function maskPhoneNumber(originalNumber) {
  let digits = originalNumber.replace(/\D/g, "");
  if (digits.length < 5) return "Invalid number";
  let lastPart = digits.slice(-5);
  return "111-" + lastPart;  // You can change "111-" to any prefix
}

// Your real phone number
const realPhoneNumber = "03497469638";
const maskedNumber = maskPhoneNumber(realPhoneNumber);

app.post('/whatsapp', async (req, res) => {
  const incomingMsg = req.body.Body.toLowerCase(); // Convert to lowercase
  const from = req.body.From;

  try {
    let replyText = "";

    // Check if the user is asking for the phone number
    if (incomingMsg.includes("phone") || incomingMsg.includes("contact") || incomingMsg.includes("number")) {
      replyText = `You can contact us on WhatsApp: ${maskedNumber}`;
    } else {
      // Otherwise, use OpenAI to reply
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are an AI assistant for Abid Khan's E-Learning Hub.
Provide clear answers about courses, fees, durations, timings, and schedules.
If the user asks for a contact number, respond with the masked number only.
          `
          },
          { role: "user", content: req.body.Body }
        ],
        max_tokens: 300
      });

      replyText = response.choices[0].message.content;
    }

    // Send reply via Twilio WhatsApp
    await twilioClient.messages.create({
      from: 'whatsapp:+YOUR_TWILIO_NUMBER',
      to: from,
      body: replyText
    });

    res.sendStatus(200);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("WhatsApp AI Agent running on port 3000"));
