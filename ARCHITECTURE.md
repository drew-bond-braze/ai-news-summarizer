# AI News App Architecture

## Overview
A simple single-file web application for searching news, generating summaries, and exporting to Slack.

## Architecture Flow

```
User Input (Braze TAM Client) 
    ↓
News Search API
    ↓
News Results Display
    ↓
User Selection (one or multiple articles)
    ↓
Summary API Integration
    ↓
Summary Results Display
    ↓
Export to Slack
```

## Components

### 1. Input Section
- Text input for Braze TAM client name
- Search button to trigger news search

### 2. News Results Section
- Display list of news articles
- Checkboxes for selecting articles to summarize
- "Generate Summary" button

### 3. Summary Section
- Display generated summaries
- Individual export buttons for each summary
- Bulk export option

### 4. Feed View
- Combined view of all summaries
- Search/filter functionality
- Export all option

## Technical Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: 
  - News API (for news search)
  - Summary API (for article summarization)
  - Slack Webhook (for export)

## Data Flow
1. User enters Braze TAM client name
2. App searches for news related to that client
3. User selects articles to summarize
4. App sends selected articles to Summary API
5. App displays summaries in feed
6. User can export individual or all summaries to Slack

## File Structure
```
/
├── index.html (main application file)
├── styles.css (embedded in HTML)
├── script.js (embedded in HTML)
└── README.md (setup instructions)
```

## API Requirements
- News API key (for searching news)
- Summary API endpoint and credentials
- Slack webhook URL for exports
