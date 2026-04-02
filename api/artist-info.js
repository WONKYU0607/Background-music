export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { artistName, language } = req.body;

  const langMap = {
    ko: '한국어',
    en: 'English',
    ja: '日本語',
    zh: '中文',
    es: 'Español',
    fr: 'Français',
  };

  const langLabel = langMap[language] || 'English';

  const prompt = `You are a music expert. Provide information about the artist "${artistName}" in ${langLabel}.
Respond ONLY with a valid JSON object, no markdown, no code blocks.

{
  "debut": "debut year and career history, 2-3 sentences",
  "bio": "artist characteristics, music style, awards, 2-3 sentences",
  "songs": [
    {"title": "song title 1", "youtube_query": "${artistName} song title 1 official"},
    {"title": "song title 2", "youtube_query": "${artistName} song title 2 official"},
    {"title": "song title 3", "youtube_query": "${artistName} song title 3 official"}
  ]
}

Use real song titles. All text fields must be in ${langLabel}.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content.map((b) => b.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch artist info', detail: e.message });
  }
}
