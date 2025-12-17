const functions = require("firebase-functions");

exports.chat = functions.https.onRequest((req, res) => {
  const { question } = req.body;
  res.json({ answer: `You asked: ${question}. Reply from Firebase Cloud API.` });
});
