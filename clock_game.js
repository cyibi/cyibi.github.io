// ⚙️ 出題対象レベル（今は level1 固定）
const quizData = clockQuizData.level1;

// 🎯 出題領域
const container = document.getElementById("quiz-area");

// ✅ 出題生成
quizData.forEach((item, index) => {
  const questionId = `answer-${index}`;
  const feedbackId = `feedback-${index}`;

  const box = document.createElement("div");
  box.className = "quiz-box";

  box.innerHTML = `
    <strong>Q${index + 1}：</strong> ${item.q}<br>
    <input type="text" id="${questionId}" placeholder="答えを入力">
    <button onclick="checkAnswer('${questionId}', '${item.a}', '${feedbackId}')">回答</button>
    <div id="${feedbackId}" class="feedback"></div>
  `;

  container.appendChild(box);
});

// 🔍 回答判定関数（ボタンクリックで評価）
function checkAnswer(inputId, correctAnswer, feedbackId) {
  const userInput = document.getElementById(inputId).value.trim();
  const feedback = document.getElementById(feedbackId);

  if (userInput === "") {
    feedback.textContent = "⚠️ 入力してください";
    feedback.className = "feedback wrong";
  } else if (userInput === correctAnswer) {
    feedback.textContent = "✅ 正解！！";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = `❌ 不正解... 正しくは「${correctAnswer}」`;
    feedback.className = "feedback wrong";
  }
}
