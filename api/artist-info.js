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

  // Wikipedia에서 아티스트 이미지 가져오기
  async function getWikipediaImage(name) {
    try {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;
      const r = await fetch(url);
      const d = await r.json();
      return d?.thumbnail?.source || d?.originalimage?.source || null;
    } catch (e) {
      return null;
    }
  }

  const imageUrl = await getWikipediaImage(artistName);

  const prompt = `You are a music expert. Provide information about the artist "${artistName}".
You MUST write ALL text fields entirely in ${langLabel}. Do NOT mix in any other language, Chinese characters, Arabic, or romanized text.
Respond ONLY with a valid JSON object. No markdown, no code blocks, no extra text outside the JSON.

{
  "debut": "2-3 sentences about debut year and career history, written entirely in ${langLabel}",
  "bio": "2-3 sentences about music style, characteristics and awards, written entirely in ${langLabel}",
  "songs": [
    {"title": "real song title 1", "youtube_query": "${artistName} real song title 1 official MV"},
    {"title": "real song title 2", "youtube_query": "${artistName} real song title 2 official MV"},
    {"title": "real song title 3", "youtube_query": "${artistName} real song title 3 official MV"}
  ]
}

Important: Use only real, existing song titles. Every word in "debut" and "bio" must be in ${langLabel} only.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: `You are a music expert. Always respond with valid JSON only. Write all descriptive text fields strictly in ${langLabel} with no other languages mixed in.`
          },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    res.status(200).json({ ...parsed, imageUrl });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch artist info', detail: e.message });
  }
}
