// Import dependencies
const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');

// App configuration
const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;

// Load data
const reasons = {
  en: JSON.parse(fs.readFileSync('./reasons/en.json', 'utf-8')),
  it: JSON.parse(fs.readFileSync('./reasons/it.json', 'utf-8'))
};

const supportedLangs = Object.keys(reasons);

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 60 * 1000,        // 1 minute window
  max: 100,                   // Max 100 requests per minute
  keyGenerator: (req, res) => {
    return req.headers['cf-connecting-ip'] || req.ip;
  },
  message: { error: "Too many requests, please try again later. (100 reqs/min/IP)" }
});

// Apply middleware
app.use(limiter);

// Define routes
app.get('/reasons', (req, res) => {
  const lang = req.query.lang?.toLowerCase() || 'en';
  const selectedLang = supportedLangs.includes(lang) ? lang : 'en';

  const langReasons = reasons[selectedLang];
  const reason = langReasons[Math.floor(Math.random() * langReasons.length)];
  res.json({ reason, lang: selectedLang });
});

// Start server
app.listen(PORT, () => {
  console.log(`StayStrong is running on port ${PORT}`);
});