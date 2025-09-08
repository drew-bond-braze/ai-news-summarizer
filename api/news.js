// Vercel serverless function to proxy News API requests
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { q, from, sortBy, pageSize, language } = req.query;
    
    if (!q) {
      res.status(400).json({ error: 'Query parameter "q" is required' });
      return;
    }

    // Get API key from environment variable or use the one from the request
    const apiKey = process.env.NEWS_API_KEY || '59f4045772a24acead4c904a98c331fc';
    
    // Build News API URL
    const newsApiUrl = new URL('https://newsapi.org/v2/everything');
    newsApiUrl.searchParams.set('q', q);
    newsApiUrl.searchParams.set('apiKey', apiKey);
    
    if (from) newsApiUrl.searchParams.set('from', from);
    if (sortBy) newsApiUrl.searchParams.set('sortBy', sortBy);
    if (pageSize) newsApiUrl.searchParams.set('pageSize', pageSize);
    if (language) newsApiUrl.searchParams.set('language', language);

    console.log('Fetching from News API:', newsApiUrl.toString().replace(apiKey, 'API_KEY_HIDDEN'));

    // Make request to News API
    const response = await fetch(newsApiUrl.toString());
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('News API error:', response.status, errorText);
      res.status(response.status).json({ 
        error: `News API error: ${response.status} ${response.statusText}`,
        details: errorText
      });
      return;
    }

    const data = await response.json();
    
    if (data.status !== 'ok') {
      console.error('News API returned error status:', data);
      res.status(400).json({ 
        error: `News API error: ${data.message || 'Unknown error'}`,
        details: data
      });
      return;
    }

    console.log('News API success:', data.totalResults, 'articles found');
    
    // Return the data
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
