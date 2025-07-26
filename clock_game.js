// 📁 JSONファイル読み込み（data/clock_game_json.json）
fetch("data/clock_game_json.json")
  .then(response => response.json())
  .then(quizData => {
    const container = document.getElementById("quiz-area");

    quizData.forEach((item, index) => {
      const questionId = `q-${index}`;
      const feedbackId = `feedback-${index}`;

      const box = document.createElement("div");
      box.className = "quiz-box";

      // ⌚ 出題文＋画像表示
      let questionHTML = `<strong>Q${index + 1}：</strong> ${item.question}<br>`;
      if (item.image) {
        questionHTML += `<img src="images/${item.image}" alt="時計画像" class="clock-image"><br>`;
      }

      // 🔀 出題形式の分岐（テキスト or 画像）
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

      // 🟢 回答ボタン＋フィードバック
      questionHTML += `
        <button onclick="checkAnswer('${questionId}', '${item.correct}', '${feedbackId}', \`${item.explanation}\`)">回答</button>
        <div id="${feedbackId}" class="feedback"></div>
      `;

      box.innerHTML = questionHTML;
      container.appendChild(box);
    });
  })
  .catch(error => {
    console.error("❌ クイズデータの読み込みに失敗:", error);
  });

// 🧠 ラジオ選択式の回答判定関数
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
