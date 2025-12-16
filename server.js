const express = require('express');
const app = express();

app.use(express.json());

// Import chat agent route
const chatAgentRoute = require('./routes/chat-agent');
app.use('/api/agent', chatAgentRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
