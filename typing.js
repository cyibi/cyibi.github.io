// 要素取得
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
  const genre = genreSelect.value.toLowerCase();

  const questionList = questions[age]?.[genre];

  if (questionList && questionList.length >= 5) {
    const shuffled = questionList.sort(() => Math.random() - 0.5);
    currentSet = shuffled.slice(0, 5);
    currentIndex = 0;
    score = 0;

    inputBox.disabled = false;
    startBtn.disabled = false;
    inputBox.value = "";
    result.textContent = "";
    feedback.textContent = "";

    showQuestion(); // 初回表示も共通関数へ
  } else {
    wordSpan.textContent = "⚠️ このジャンルには問題が5問以上必要です";
    inputBox.disabled = true;
    startBtn.disabled = true;
    result.textContent = "";
    feedback.textContent = "";
  }
});

// 現在の問題を表示（進捗含む）
function showQuestion() {
  const total = currentSet.length;
  const remaining = total - currentIndex - 1;
  const questionText = currentSet[currentIndex];

  wordSpan.textContent = `第${currentIndex + 1}問（${currentIndex + 1}/${total}問）｜あと${remaining}問：${questionText}`;
}

// タイピング判定と進行
startBtn.addEventListener("click", () => {
  const userInput = inputBox.value.trim();
  const correctAnswer = currentSet[currentIndex];

  if (userInput === "") {
    feedback.textContent = "⛳ 入力してみましょう！";
    return;
  }

  if (userInput === correctAnswer) {
    result.textContent = `✅ 正解！「${correctAnswer}」`;
    result.style.color = "green";
    score++;
  } else {
    result.textContent = `❌ 残念！正しくは「${correctAnswer}」でした`;
    result.style.color = "red";
  }

  currentIndex++;

  if (currentIndex < currentSet.length) {
    inputBox.value = "";
    feedback.textContent = "";
    showQuestion();
  } else {
    wordSpan.textContent = `🎉 全${currentSet.length}問終了！ ${score}問正解でした！`;
    inputBox.disabled = true;
    startBtn.disabled = true;
    feedback.textContent = "";
    result.style.color = "blue";
  }
});

// Enterキーで回答できる補助機能
inputBox.addEventListener("keydown", (e) => {
  if (!startBtn.disabled && e.key === "Enter") {
    startBtn.click();
  }
});
