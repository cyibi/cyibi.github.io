require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/getWord', async (req, res) => {
  const age = req.body.age;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `${age}歳向けのタイピング練習として、簡単な日本語の単語を1つ出題してください。`
      }]
    })
  });

  const data = await response.json();
  res.json({ word: data.choices[0].message.content.trim() });
});

app.listen(port, () => {
  console.log(`サーバー起動中：http://localhost:${port}`);
});