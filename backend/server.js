const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Localhost is working!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
