# AI News Summarizer

A simple, single-file web application for searching news, generating AI summaries, and exporting to Slack.

## Features

✅ **Search News**: Enter a Braze TAM client name to search for relevant news articles  
✅ **Select Articles**: Choose one or multiple articles to summarize  
✅ **AI Summaries**: Generate summaries using a third-party Summary API  
✅ **Feed View**: View all generated summaries in a clean feed interface  
✅ **Export to Slack**: Export individual or all summaries to Slack  
✅ **Search & Filter**: Search through summaries and news articles  
✅ **Responsive Design**: Works on desktop and mobile devices  

## Setup Instructions

### 1. API Configuration

Before using the app, you need to configure the following APIs in the `CONFIG` object in `index.html`:

```javascript
const CONFIG = {
    NEWS_API_KEY: 'YOUR_NEWS_API_KEY',           // Get from newsapi.org
    NEWS_API_URL: 'https://newsapi.org/v2/everything',
    SUMMARY_API_URL: 'YOUR_SUMMARY_API_ENDPOINT', // Your Summary API endpoint
    SLACK_WEBHOOK_URL: 'YOUR_SLACK_WEBHOOK_URL'   // Your Slack webhook URL
};
```

### 2. Required API Keys

#### News API (Required for Real News Search)
- Sign up at [newsapi.org](https://newsapi.org) (free tier available)
- Get your free API key from the dashboard
- Replace `YOUR_NEWS_API_KEY` in the config
- **Free tier includes**: 1,000 requests per month, articles from last 30 days

#### Summary API
- Set up your Summary API endpoint
- Replace `YOUR_SUMMARY_API_ENDPOINT` in the config
- Ensure it accepts POST requests with article data

#### Slack Integration
- Create a Slack webhook in your workspace
- Replace `YOUR_SLACK_WEBHOOK_URL` in the config

### 3. Running the App

1. Open `index.html` in any modern web browser
2. Configure your API keys as described above
3. Start searching for news!

**Test with real companies:**
- Try "Apple", "Microsoft", "Tesla", "OpenAI"
- The app will fetch real news articles from the last 7 days
- Preview metadata before sending to your 3rd party API

## How to Use

1. **Search**: Enter a Braze TAM client name and click "Search News"
2. **Select**: Check the boxes next to articles you want to summarize
3. **Summarize**: Click "Generate Summaries" to create AI summaries
4. **View**: Browse summaries in the "Generated Summaries" section
5. **Export**: Export individual summaries or all summaries to Slack
6. **Feed**: Use the "Summary Feed" to view all your summaries

## API Integration Points

### News Search API
The app now includes real News API integration! Just add your API key:

```javascript
// Already implemented - just add your API key to CONFIG
const CONFIG = {
    NEWS_API_KEY: 'your-actual-api-key-here', // Get from newsapi.org
    NEWS_API_URL: 'https://newsapi.org/v2/everything',
    // ... other config
};
```

**Features:**
- ✅ Real news articles from the last 7 days
- ✅ Top 5 most relevant articles
- ✅ Automatic fallback to mock data if API key not configured
- ✅ Error handling and user feedback

### Summary API
To integrate with your Summary API:

```javascript
// Replace mockSummaryGeneration function with actual API call
async function generateSummaries(articles) {
    const response = await fetch(CONFIG.SUMMARY_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles: articles })
    });
    return await response.json();
}
```

### Slack Export
To integrate with Slack webhooks:

```javascript
// Replace mockSlackExport function with actual webhook call
async function exportToSlack(summary) {
    await fetch(CONFIG.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: `*${summary.originalTitle}*\n\n${summary.summary}\n\nSource: ${summary.source}`
        })
    });
}
```

## File Structure

```
/
├── index.html          # Main application file (HTML + CSS + JavaScript)
├── ARCHITECTURE.md     # Architecture documentation
└── README.md          # This setup guide
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

The app is designed to be easily customizable:

- **Styling**: Modify the CSS in the `<style>` section
- **Layout**: Adjust the HTML structure in the `<body>` section
- **Functionality**: Extend the JavaScript functions as needed
- **APIs**: Replace mock functions with real API integrations

## Security Notes

⚠️ **IMPORTANT**: This repository contains a News API key for demonstration purposes. In production:

- **Never commit API keys to version control**
- **Use environment variables** for production deployments
- **Rotate API keys regularly**
- **Implement proper error handling** for API failures
- **Add rate limiting** for API calls if needed
- **Consider using Vercel environment variables** for secure key management

## Troubleshooting

### Common Issues

1. **CORS Errors**: If testing locally, you may need to serve the file from a web server
2. **API Key Issues**: Ensure your API keys are correctly configured
3. **Network Errors**: Check your internet connection and API endpoints

### Development Server

To avoid CORS issues during development, serve the file using a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.
