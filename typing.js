async function getAIWord(age) {
  const response = await fetch('http://localhost:3000/getWord', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ age })
  });
  const data = await response.json();
  return data.word;
}