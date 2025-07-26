const container = document.getElementById("quiz-area");

clockQuizData.level1.forEach((item, index) => {
  const box = document.createElement("div");
  box.className = "quiz-box";

  box.innerHTML = `
    <strong>Q${index + 1}：</strong> ${item.q}<br>
    <input type="text" id="answer-${index}" placeholder="答えを入力">
    <button onclick="checkAnswer(${index}, '${item.a}')">回答</button>
    <div class="feedback" id="feedback-${index}"></div>
  `;

  container.appendChild(box);
});

// 回答ボタン判定関数
function checkAnswer(index, correctAnswer) {
  const userInput = document.getElementById(`answer-${index}`).value.trim();
  const feedback = document.getElementById(`feedback-${index}`);
  if (userInput === "") {
    feedback.textContent = "⚠️ 入力してください";
    feedback.className = "feedback wrong";
    return;
  }
  if (userInput === correctAnswer) {
    feedback.textContent = "✅ 正解！！";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = `❌ 不正解... 正しくは「${correctAnswer}」`;
    feedback.className = "feedback wrong";
  }
}
