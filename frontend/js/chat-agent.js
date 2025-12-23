// chat-agent.js
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",  // or gpt-4, gpt-4o
      messages: [
        {
          role: "system",
          content: `
You are an AI assistant for Abid Khan's E-Learning Hub.
Provide clear, professional answers about courses, fees, durations, timings, and schedules.
Course Information:
1. O-Level Courses: Fee $200, Duration 6 months, Classes Mon-Fri 4 PM - 6 PM
2. A-Level Courses: Fee $300, Duration 8 months, Classes Mon-Fri 5 PM - 7 PM
3. Web Development: Fee $250, Duration 4 months, Classes Tue-Thu 6 PM - 8 PM
4. Cybersecurity: Fee $350, Duration 5 months, Classes Mon, Wed, Fri 6 PM - 8 PM
5. Data Science / Analytics: Fee $300, Duration 4 months, Classes Mon-Fri 7 PM - 9 PM
6. Cloud Computing: Fee $320, Duration 4 months, Classes Sat-Sun 3 PM - 6 PM
7. Quran Tutorials (Optional): Fee $150, Duration 3 months, Classes Tue-Thu 5 PM - 6 PM

Always provide concise answers.
Be polite and encouraging.
If a user asks about a course not listed, politely guide them to contact via email or WhatsApp.
          `
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 300
    });

    const agentReply = response.choices?.[0]?.message?.content || "No response from AI.";

    res.json({ success: true, reply: agentReply });

  } catch (error) {
    console.error("AI Agent Error:", error);
    res.status(500).json({ success: false, error: "AI Agent failed. Check server logs." });
  }
});

module.exports = router;
