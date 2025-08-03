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

// 出題セット（5問）準備
confirmBtn.addEventListener("click", () => {
  const age = ageSelect.value;
  const genre = genreSelect.value.toLowerCase();

  const questionList = questions[age]?.[genre];

  if (questionList && questionList.length >= 5) {
    const shuffled = questionList.sort(() => Math.random() - 0.5);
    currentSet = shuffled.slice(0, 5);
    currentIndex = 0;
    score = 0;

    const total = currentSet.length;
    wordSpan.textContent = `第1問（1/${total}問）｜あと${total - 1}問：${currentSet[0]}`;
    inputBox.disabled = false;
    startBtn.disabled = false;
    inputBox.value = "";
    result.textContent = "";
    feedback.textContent = "";
  } else {
    wordSpan.textContent = "⚠️ このジャンルには問題が5問以上必要です";
    inputBox.disabled = true;
    startBtn.disabled = true;
    result.textContent = "";
    feedback.textContent = "";
  }
});

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
    const total = currentSet.length;
    const remaining = total - (currentIndex + 1);
    wordSpan.textContent = `第${currentIndex + 1}問（${currentIndex + 1}/${total}問）｜あと${remaining >= 0 ? remaining : 0}問：${currentSet[currentIndex]}`;
    inputBox.value = "";
    feedback.textContent = "";
  } else {
    wordSpan.textContent = `🎉 全${currentSet.length}問終了！ ${score}問正解でした！`;
    inputBox.disabled = true;
    startBtn.disabled = true;
    feedback.textContent = "";
    result.style.color = "blue";
  }
});

// Enterキー対応（任意）
inputBox.addEventListener("keydown", (e) => {
  if (!startBtn.disabled && e.key === "Enter") {
    startBtn.click();
  }
});
