// Import dependencies
const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');

// App configuration
const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;

// Cache for reasons data
let reasonsCache = null;
let supportedLangs = [];

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

// Setup application routes
setupRoutes(app);

// Start the server
startServer();

// ========== FUNCTIONS ==========

// Load and cache reasons data
function loadReasons() {
  try {
    const reasonsPath = path.join(__dirname, 'reasons', 'combined.json');
    const data = fs.readFileSync(reasonsPath, 'utf-8');
    reasonsCache = JSON.parse(data);
    supportedLangs = Object.keys(reasonsCache);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('❌ File combined.json not found. Please run "npm run compile-lang" to compile language files first.');
    } else {
      console.error('Error loading reasons:', error.message);
    }
  }
}

// Optimized random selection function
function getRandomReason(langReasons) {
  const randomIndex = Math.floor(Math.random() * langReasons.length);
  return langReasons[randomIndex];
}

// Function to setup all application routes
function setupRoutes(app) {
  // Get random reason endpoint
  app.get('/reasons', (req, res) => {
    // Check if reasons are loaded
    if (!reasonsCache) {
      loadReasons();
      if (!reasonsCache) {
        return res.status(503).json({ error: 'Service temporarily unavailable' });
      }
    }

    const lang = req.query.lang?.toLowerCase() || 'en';
    const selectedLang = supportedLangs.includes(lang) ? lang : 'en';

    const langReasons = reasonsCache[selectedLang];
    if (!langReasons || langReasons.length === 0) {
      return res.status(404).json({ error: 'No reasons found for this language' });
    }

    const reason = getRandomReason(langReasons);
    res.json({ reason, lang: selectedLang });
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      languages: supportedLangs,
      totalReasons: supportedLangs.reduce((total, lang) => total + (reasonsCache[lang]?.length || 0), 0)
    });
  });
}

// Start server function
async function startServer() {
  try {
    await loadReasons();
    app.listen(PORT, () => {
      console.log(`StayStrong is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}