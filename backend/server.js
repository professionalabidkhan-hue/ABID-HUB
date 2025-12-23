const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const contactRoutes = require('./routes/contact');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/contact', contactRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
