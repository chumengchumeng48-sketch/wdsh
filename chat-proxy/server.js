const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // 适用于 node-fetch v3+

const app = express();
const PORT = process.env.PORT || 3000;

// 使用 CORS 中间件，允许您的 GitHub Pages 域名访问
app.use(cors({
  origin: ['https://chumengchumeng48-sketch.github.io'], // 替换成您的 GitHub Pages 地址
  credentials: true
}));
app.use(express.json());

// 您的代理端点
app.post('/api/chat', async (req, res) => {
  // 在这里设置您真实的 DeepSeek API 密钥
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-7891c0a7510e47de83a0560bfc942f0a';
  const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
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
    res.json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
