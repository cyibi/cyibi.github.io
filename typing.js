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

// 出題セットの準備（5問をランダム抽出）
confirmBtn.addEventListener("click", () => {
  const age = ageSelect.value;
  const genre = genreSelect.value.toLowerCase();

  const fullList = questions[age]?.[genre];

  if (fullList && fullList.length >= 5) {
    const shuffled = fullList.sort(() => Math.random() - 0.5);
    currentSet = shuffled.slice(0, 5);
    currentIndex = 0;
    score = 0;

    wordSpan.textContent = `第1問：${currentSet[currentIndex]}`;
    inputBox.disabled = false;
    startBtn.disabled = false;
    inputBox.value = "";
    result.textContent = "";
    feedback.textContent = "";
  } else {
    wordSpan.textContent = "問題数が足りません";
    inputBox.disabled = true;
    startBtn.disabled = true;
  }
});

// 各問の判定と進行
startBtn.addEventListener("click", () => {
  const userInput = inputBox.value.trim();
  const correctAnswer = currentSet[currentIndex];

  if (userInput === "") {
    feedback.textContent = "入力欄が空です。まずは答えてみましょう！";
    return;
  }

  if (userInput === correctAnswer) {
    result.textContent = `✅ 正解！「${correctAnswer}」`;
    result.style.color = "green";
    score++;
  } else {
    result.textContent = `❌ 間違い。「${correctAnswer}」でした`;
    result.style.color = "red";
  }

  currentIndex++;

  if (currentIndex < currentSet.length) {
    wordSpan.textContent = `第${currentIndex + 1}問：${currentSet[currentIndex]}`;
    inputBox.value = "";
    feedback.textContent = "";
  } else {
    wordSpan.textContent = `🎉セット終了！5問中${score}問正解でした`;
    inputBox.disabled = true;
    startBtn.disabled = true;
    feedback.textContent = "";
  }
});
