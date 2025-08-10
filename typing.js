// 要素取得
const confirmBtn = document.getElementById("confirm");
const ageSelect = document.getElementById("age");
const genreSelect = document.getElementById("genre");
const wordSpan = document.getElementById("word");
const inputBox = document.getElementById("input");
const startBtn = document.getElementById("start");
const result = document.getElementById("result");
const feedback = document.getElementById("feedback"); // 存在しない場合は null
const timerDisplay = document.getElementById("timer");
const adArea = document.getElementById("adArea"); // 広告画像表示領域

let currentSet = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLimit = 0;

// 出題セット（5問）を準備
confirmBtn.addEventListener("click", () => {
  const age = ageSelect.value;
  const genre = genreSelect.value.toLowerCase();
  const questionList = questions[age]?.[genre];

  if (questionList && questionList.length >= 5) {
    const noAdGenres = ["ゲーム", "アニメ"];
    const showInlineAd = !noAdGenres.includes(genre);

    startGame(questionList, showInlineAd);
  } else {
    wordSpan.textContent = "⚠️ このジャンルには問題が5問以上必要です";
    inputBox.disabled = true;
    startBtn.disabled = true;
    result.textContent = "";
    if (feedback) feedback.textContent = "";
  }
});

function startGame(questionList, showAd) {
  const shuffled = questionList.sort(() => Math.random() - 0.5);
  currentSet = shuffled.slice(0, 5);
  currentIndex = 0;
  score = 0;

  inputBox.disabled = false;
  startBtn.disabled = false;
  inputBox.value = "";
  result.textContent = "";
  if (feedback) feedback.textContent = "";

  timeLimit = 0; // タイマーなし（初級固定）

  if (showAd) startInlineAd();

  showQuestion();
}

// 現在の問題を表示
function showQuestion() {
  const total = currentSet.length;
  const questionText = currentSet[currentIndex];

  wordSpan.textContent = `第${currentIndex + 1}問（${currentIndex + 1}/${total}問）: ${questionText}`;
  inputBox.value = "";
  if (feedback) feedback.textContent = "";
  result.textContent = "";

  timerDisplay.textContent = ""; // タイマー非表示
}

// タイピング判定と進行
startBtn.addEventListener("click", () => {
  const userInput = inputBox.value.trim();
  const correctAnswer = currentSet[currentIndex];

  if (userInput === "") {
    if (feedback) feedback.textContent = "⛳ 入力してみましょう！";
    return;
  }

  if (userInput === correctAnswer) {
    result.textContent = `✅ 正解！「${correctAnswer}」`;
    result.style.color = "green";
    score++;
    currentIndex++;
    if (currentIndex < currentSet.length) {
      showQuestion();
    } else {
      endGame();
    }
  } else {
    result.textContent = `❌ 間違い！もう一度挑戦してみよう`;
    result.style.color = "red";
    inputBox.value = "";
    if (feedback) feedback.textContent = "ヒント：スペルを確認してみて！";
  }
});

// Enterキーで回答できる補助機能
inputBox.addEventListener("keydown", (e) => {
  if (!startBtn.disabled && e.key === "Enter") {
    startBtn.click();
  }
});

// ゲーム終了処理
function endGame() {
  wordSpan.textContent = `🎉 全${currentSet.length}問終了！ ${score}問正解でした！`;
  inputBox.disabled = true;
  startBtn.disabled = true;
  if (feedback) feedback.textContent = "";
  result.style.color = "blue";
  timerDisplay.textContent = "";
}

// 広告画像をタイピング中に表示
function startInlineAd() {
  const adImages = ["ad1.jpg", "ad2.jpg", "ad3.jpg"]; // 画像ファイル名を適宜変更
  let index = 0;

  if (!adArea) return;

  adArea.src = adImages[index];
  setInterval(() => {
    index = (index + 1) % adImages.length;
    adArea.src = adImages[index];
  }, 5000); // 5秒ごとに切り替え
}
