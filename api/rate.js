export default async function handler(req, res) {
  const token = process.env.WISE_API_TOKEN;
  console.log('[rate] token exists:', !!token, 'length:', token ? token.length : 0);

  if (!token) {
    return res.status(500).json({ error: 'WISE_API_TOKEN not configured' });
  }

  try {
    const url = 'https://api.wise.com/v1/rates?source=AED&target=CNY';
    console.log('[rate] fetching:', url);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('[rate] Wise responded:', response.status);

    if (!response.ok) {
      const body = await response.text();
      console.log('[rate] Wise error body:', body);
      return res.status(502).json({ error: `Wise API returned ${response.status}`, detail: body });
    }

    const data = await response.json();
    console.log('[rate] Wise data:', JSON.stringify(data[0]));
    const { rate, time } = data[0];

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({ rate, timestamp: time });
  } catch (err) {
    console.log('[rate] exception:', err.message);
    return res.status(502).json({ error: 'Failed to fetch exchange rate', detail: err.message });
  }
}
