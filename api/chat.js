// api/chat.js
export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 您的 DeepSeek API 密钥
  const DEEPSEEK_API_KEY = 'sk-7891c0a7510e47de83a0560bfc942f0a';
  
  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    
    // 设置 CORS 头，允许您的 GitHub Pages 域名访问
    res.setHeader('Access-Control-Allow-Origin', 'https://chumengchumeng48-sketch.github.io');
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.setHeader('Access-Control-Allow-Origin', 'https://chumengchumeng48-sketch.github.io');
    res.status(500).json({ error: error.message });
  }
}

// 对于 Vercel 的 serverless 函数，需要这样导出
// module.exports = handler;
