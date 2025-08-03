// 必要な要素の取得
const confirmBtn = document.getElementById("confirm");
const ageSelect = document.getElementById("age");
const genreSelect = document.getElementById("genre");
const wordSpan = document.getElementById("word");
const inputBox = document.getElementById("input");
const startBtn = document.getElementById("start");
const result = document.getElementById("result");
const feedback = document.getElementById("feedback");

let currentSet = [];
let currentIndex = 0;
let score = 0;

// 出題セット（5問）を準備
confirmBtn.addEventListener("click", () => {
  const age = ageSelect.value;
  const genre = genreSelect.value.toLowerCase(); // 小文字に揃える

  const questionList = questions[age]?.[genre];

  if (questionList && questionList.length >= 5) {
    // ランダムに並べ替えて5問抽出
    const shuffled = questionList.sort(() => Math.random() - 0.5);
    currentSet = shuffled.slice(0, 5);
    currentIndex = 0;
    score = 0;

    // 初期表示設定
    wordSpan.textContent = `第1問：${currentSet[currentIndex]}`;
    inputBox.disabled = false;
    startBtn.disabled = false;
    inputBox.value = "";
    result.textContent = "";
    feedback.textContent = "";
  } else {
    wordSpan.textContent = "⚠️ 問題が足りません。別のジャンルを選んでください。";
    inputBox.disabled = true;
    startBtn.disabled = true;
    result.textContent = "";
    feedback.textContent = "";
  }
});

// 各問の判定と進行
startBtn.addEventListener("click", () => {
  const userInput = inputBox.value.trim();
  const correctAnswer = currentSet[currentIndex];

  if (userInput === "") {
    feedback.textContent = "⛳ 何か入力してみましょう！";
    return;
  }

  if (userInput === correctAnswer) {
    result.textContent = `✅ 正解！「${correctAnswer}」`;
    result.style.color = "green";
    score++;
  } else {
    result.textContent = `❌ 残念！正しくは「${correctAnswer}」です`;
    result.style.color = "red";
  }

  currentIndex++;

  if (currentIndex < currentSet.length) {
    wordSpan.textContent = `第${currentIndex + 1}問：${currentSet[currentIndex]}`;
    inputBox.value = "";
    feedback.textContent = "";
  } else {
    // 5問終了
    wordSpan.textContent = `🎉 完了！5問中 ${score} 問正解でした！`;
    inputBox.disabled = true;
    startBtn.disabled = true;
    feedback.textContent = "";
    result.style.color = "blue";
  }
});
