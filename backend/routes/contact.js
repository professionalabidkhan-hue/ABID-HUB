const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /contact
router.post('/', async (req, res) => {
  const { name, email, message, number } = req.body;

  try {
    // Configure mail transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail', // or your SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Mail options
    let mailOptions = {
      from: email,
      to: 'info@abidkhanhub.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `Message: ${message}\nEmail: ${email}\nWhatsApp: ${number}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error sending message.' });
  }
});

module.exports = router;
