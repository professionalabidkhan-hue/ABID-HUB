const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Twilio credentials
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

app.post('/whatsapp', async (req, res) => {
  const incomingMsg = req.body.Body;
  const from = req.body.From; // WhatsApp sender number

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for Abid Khan's E-Learning Hub. 
          Provide clear answers about courses, fees, durations, timings, and schedules.`
        },
        { role: "user", content: incomingMsg }
      ],
      max_tokens: 300
    });

    const replyText = response.choices[0].message.content;

    // Send reply back to WhatsApp
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
