// 📁 clock_game_json.json の読み込み
fetch("clock_game_json.json")
  .then(response => response.json())
  .then(quizData => {
    const container = document.getElementById("quiz-area");

    quizData.forEach((item, index) => {
      const questionId = `q-${index}`;
      const feedbackId = `feedback-${index}`;

      const box = document.createElement("div");
      box.className = "quiz-box";

      // ⌚ 出題文＋問題画像（あれば）
      let questionHTML = `<strong>Q${index + 1}：</strong> ${item.question}<br>`;
      if (item.image) {
        questionHTML += `<img src="images/${item.image}" alt="時計画像" class="clock-image"><br>`;
      }

      // 🔀 出題形式（text_choice or image_choice）
      if (item.type === "text_choice") {
        item.choices.forEach((choice, i) => {
          questionHTML += `
            <label>
              <input type="radio" name="${questionId}" value="${choice}">
              ${choice}
            </label><br>
          `;
        });
      } else if (item.type === "image_choice") {
        item.choices.forEach((choice, i) => {
          questionHTML += `
            <label>
              <input type="radio" name="${questionId}" value="${choice}">
              <img src="images/${choice}" alt="選択肢画像" class="choice-image">
            </label>
          `;
        });
      }

      // ✨ HTMLを挿入
      box.innerHTML = questionHTML;

      // 🔘 回答ボタン
      const button = document.createElement("button");
      button.textContent = "回答";
      button.addEventListener("click", () => {
        checkAnswer(questionId, item.correct, feedbackId, item.explanation);
      });
      box.appendChild(button);

      // 💬 フィードバック表示領域
      const feedback = document.createElement("div");
      feedback.id = feedbackId;
      feedback.className = "feedback";
      box.appendChild(feedback);

      // 📥 コンテナへ追加
      container.appendChild(box);
    });
  })
  .catch(error => {
    console.error("❌ クイズデータの読み込み失敗:", error);
  });

// ✅ 回答チェック関数（ラジオボタン方式）
function checkAnswer(name, correct, feedbackId, explanation) {
  const options = document.getElementsByName(name);
  let selected = "";
  for (let opt of options) {
    if (opt.checked) {
      selected = opt.value;
      break;
    }
  }

  const feedback = document.getElementById(feedbackId);
  if (!selected) {
    feedback.textContent = "⚠️ 答えを選んでください";
    feedback.className = "feedback wrong";
  } else if (selected === correct) {
    feedback.textContent = `✅ 正解！！ ${explanation}`;
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = `❌ 不正解... 正しくは「${correct}」。${explanation}`;
    feedback.className = "feedback wrong";
  }
}
