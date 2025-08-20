// 要素取得
const confirmBtn = document.getElementById("confirm");
const ageSelect = document.getElementById("age");
const genreSelect = document.getElementById("genre");
const wordSpan = document.getElementById("word");
const inputBox = document.getElementById("input");
const startBtn = document.getElementById("start");
const result = document.getElementById("result");
const feedback = document.getElementById("feedback");
const timerDisplay = document.getElementById("timer");
const adContainer = document.getElementById("videoContainer"); // 広告表示エリア

let currentSet = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLimit = 0;

// 出題セット準備
confirmBtn.addEventListener("click", () => {
  const age = ageSelect.value;
  const selectedGenreValue = genreSelect.value;

  const genreInfo = genreDefinitions?.[selectedGenreValue];
  if (!genreInfo) {
    wordSpan.textContent = "⚠️ ジャンル定義が見つかりません";
    inputBox.disabled = true;
    startBtn.disabled = true;
    adContainer.style.display = "none";
    return;
  }

  const genreKey = genreInfo.key;
  const questionList = questions?.[age]?.[genreKey];

  if (!Array.isArray(questionList) || questionList.length < 5) {
    wordSpan.textContent = "⚠️ このジャンルには問題が5問以上必要です。別のジャンルを選んでください。";
    inputBox.disabled = true;
    startBtn.disabled = true;
    result.textContent = "";
    if (feedback) feedback.textContent = "";
    adContainer.style.display = "none";
    return;
  }

  startGame(questionList, genreInfo);
});

// ゲーム開始処理
function startGame(questionList, genreInfo) {
  const shuffled = questionList.sort(() => Math.random() - 0.5);
  currentSet = shuffled.slice(0, 5);
  currentIndex = 0;
  score = 0;
  timeLimit = genreInfo.timeLimit;

  inputBox.disabled = false;
  startBtn.disabled = false;
  inputBox.value = "";
  result.textContent = "";
  if (feedback) feedback.textContent = "";

 // 広告表示制御（動画の代替）
if (genreInfo?.showAd && adContainer) {
  adContainer.style.display = "block";
} else if (adContainer) {
  adContainer.style.display = "none";
}

  showQuestion();
}

// 問題表示
function showQuestion() {
  inputBox.disabled = false;
  inputBox.focus();

  const total = currentSet.length;
  const questionText = currentSet[currentIndex];

  wordSpan.textContent = `第${currentIndex + 1}問（${currentIndex + 1}/${total}問）: ${questionText}`;
  inputBox.value = "";
  result.textContent = "";
  if (feedback) feedback.textContent = "";

  if (timeLimit > 0) {
    startTimer(timeLimit);
  } else {
    timerDisplay.textContent = "";
  }
}

// タイマー処理
function startTimer(seconds) {
  let remaining = seconds;
  timerDisplay.textContent = `⏱ 残り ${remaining} 秒`;
  clearInterval(timer);
  timer = setInterval(() => {
    remaining--;
    timerDisplay.textContent = `⏱ 残り ${remaining} 秒`;
    timerDisplay.style.color = remaining <= 3 ? "red" : "#0077cc";

    if (remaining <= 0) {
      clearInterval(timer);
      inputBox.disabled = true;
      startBtn.disabled = true;
      result.textContent = `⌛ 時間切れ！正しくは「${currentSet[currentIndex]}」でした`;
      result.style.color = "red";
      setTimeout(() => {
        currentIndex++;
        if (currentIndex < currentSet.length) {
          inputBox.disabled = false;
          startBtn.disabled = false;
          showQuestion();
        } else {
          endGame();
        }
      }, 2000);
    }
  }, 1000);
}

// 回答判定
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
    clearInterval(timer);
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

// Enterキーで回答
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


