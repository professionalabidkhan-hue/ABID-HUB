// server.js
import express from "express";
const app = express();
app.use(express.json());

// Simple AI reply endpoint
app.post("/chat", (req, res) => {
  const { question } = req.body;
  // For now, just echo back
  res.json({ answer: `You asked: ${question}. This is a reply from the server.` });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
