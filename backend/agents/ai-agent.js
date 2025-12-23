const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// AI Agent Route
router.post('/', async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Send message to AI model
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI Agent for Abid Khan's E-Learning Hub. Answer briefly, clearly, and professionally. Provide useful educational guidance."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 200
    });

    const agentReply = response.choices?.[0]?.message?.content || "No response from AI.";

    res.json({
      success: true,
      reply: agentReply
    });

  } catch (error) {
    console.error("AI Agent Error:", error);
    res.status(500).json({
      success: false,
      error: "AI Agent failed. Check server logs."
    });
  }
});

module.exports = router;
