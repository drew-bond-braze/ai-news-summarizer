// Vercel serverless function to proxy Tray API requests
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

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Get the Tray API URL from environment variable or use the default
    const trayApiUrl = process.env.TRAY_API_URL || 'https://e69c2c99-3dba-4bf8-82d0-d5b03a5da695.trayapp.io';
    
    console.log('Proxying request to Tray API:', trayApiUrl);
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Make request to Tray API
    const response = await fetch(trayApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Tray API error:', response.status, errorText);
      res.status(response.status).json({ 
        error: `Tray API error: ${response.status} ${response.statusText}`,
        details: errorText
      });
      return;
    }

    // Try to parse JSON response, fallback to text if not JSON
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    console.log('Tray API success:', data);
    
    // Return the data
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Tray proxy error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
