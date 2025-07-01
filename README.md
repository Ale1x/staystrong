# StayStrong 💪

A simple API that provides motivational reasons to help people through difficult moments. When life gets tough, sometimes we just need a gentle reminder of our worth and strength.

## 🌟 What it does

StayStrong serves random motivational messages in multiple languages to remind you that:
- You are loved and valued
- You have overcome challenges before
- Tomorrow can be better than today
- You deserve happiness and peace
- You are stronger than you think

## 💭 Why?

This project was born from personal struggle. I've been going through difficult times, dealing with challenges that sometimes made me forget my own worth and strength. During those dark moments, I realized how powerful a few simple words of encouragement can be.

I created StayStrong not just for myself, but for everyone who, like me, sometimes needs a gentle reminder that they matter, that they're stronger than they think, and that better days are ahead. 

Sometimes we all need someone to tell us:
- "You are not alone"
- "You have value"
- "You can get through this"
- "You are loved"

If you're reading this and you're struggling too, know that you're not alone. This little API is my way of sending you a virtual hug and a reminder that you matter. We're in this together. 🤗

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/Ale1x/staystrong.git
cd staystrong

# Install dependencies
npm install

# Start the server
npm start
```

The server will start on port 3000 (or the port specified in the `PORT` environment variable).

## 📖 API Usage

### Get a Random Motivational Reason

**Endpoint:** `GET /reasons`

**Query Parameters:**
- `lang` (optional): Language code (`en` for English, `it` for Italian (more to come)). Defaults to `en`.

**Example Requests:**

```bash
# Get a reason in English (default)
curl http://localhost:3000/reasons

# Get a reason in Italian
curl http://localhost:3000/reasons?lang=it

# Get a reason in English (explicit)
curl http://localhost:3000/reasons?lang=en
```

**Example Response:**

```json
{
  "reason": "You are stronger than any storm that may cross you.",
  "lang": "en"
}
```

### Rate Limiting

The API implements rate limiting to ensure fair usage:
- **Limit:** 100 requests per minute per IP address
- **Response when exceeded:** HTTP 429 with error message

## 🌍 Supported Languages

- **English** (`en`) - 500 motivational reasons
- **Italian** (`it`) - 500 motivational reasons

## 🛠️ Technical Details

- **Framework:** Express.js
- **Rate Limiting:** 100 requests/minute per IP
- **Response Format:** JSON
- **Content-Type:** `application/json`
- **CORS:** Not configured (add if needed for browser clients)

## 📝 Contributing

Want to help make StayStrong better? Here are some ways to contribute:

### Adding New Languages

1. Create a new JSON file in the `reasons/` directory (e.g., `fr.json` for French)
2. Add an array of motivational reasons in that language
3. Update the `reasons` object in `index.js` to include the new language
4. Update the `supportedLangs` documentation

### Adding More Reasons

1. Edit the appropriate language file in the `reasons/` directory
2. Add new motivational messages to the JSON array
3. Ensure all messages are positive, supportive, and appropriate

### Code Improvements

- Submit bug fixes
- Improve error handling
- Add new features (while keeping the API simple)
- Improve documentation

## 🤝 Philosophy

StayStrong believes that sometimes the smallest gestures can make the biggest difference. A few words of encouragement at the right moment can change someone's entire day, or even their life.

This project aims to be:
- **Simple:** Easy to use and integrate
- **Positive:** All content focuses on hope and strength
- **Accessible:** Available in multiple languages
- **Free:** Always available for anyone who needs it

## 🆘 Crisis Resources

**If you are in immediate danger or having thoughts of self-harm, please reach out for professional help immediately.**

### International
- **International Association for Suicide Prevention**: [https://www.iasp.info/resources/Crisis_Centres/](https://www.iasp.info/resources/Crisis_Centres/)
- **Crisis Text Line**: Text HOME to 741741 (US, UK, Canada)

### United States
- **988 Suicide & Crisis Lifeline**: **988** or [https://988lifeline.org/](https://988lifeline.org/)
- **Crisis Text Line**: Text HOME to **741741**

### United Kingdom
- **Samaritans**: **116 123** (free) or [https://www.samaritans.org/](https://www.samaritans.org/)
- **Crisis Text Line UK**: Text SHOUT to **85258**

### Italy
- **Telefono Amico Italia**: **02 2327 2327** or [https://www.telefonoamico.it/](https://www.telefonoamico.it/)
- **Samaritans Onlus**: **06 77208977** or [http://www.samaritansonlus.org/](http://www.samaritansonlus.org/)

### Online Resources
- **7 Cups**: Free emotional support - [https://www.7cups.com/](https://www.7cups.com/)
- **BetterHelp**: Professional online therapy - [https://www.betterhelp.com/](https://www.betterhelp.com/)
- **Mental Health America**: [https://www.mhanational.org/](https://www.mhanational.org/)

**Remember: Seeking help is a sign of strength, not weakness. You matter, and there are people who want to help you through this.** 💜

## 📄 License

This project is open source. Feel free to use it, modify it, and share it to help spread positivity in the world.

## 💡 Examples

### Integration Examples

**JavaScript/Fetch:**
```javascript
fetch('https://your-domain.com/reasons?lang=en')
  .then(response => response.json())
  .then(data => console.log(data.reason));
```

**Python:**
```python
import requests

response = requests.get('https://your-domain.com/reasons?lang=it')
data = response.json()
print(data['reason'])
```
