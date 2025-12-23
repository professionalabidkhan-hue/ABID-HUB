const functions = require("firebase-functions");
const express = require("express");
const app = express();
app.use(express.json());

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  // For now, just echo back
  res.json({ reply: "You said: " + userMessage });
});

exports.chat = functions.https.onRequest(app);
