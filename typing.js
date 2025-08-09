// 要素取得
const confirmBtn = document.getElementById("confirm");
const ageSelect = document.getElementById("age");
const genreSelect = document.getElementById("genre");
const wordSpan = document.getElementById("word");
const inputBox = document.getElementById("input");
const startBtn = document.getElementById("start");
const result = document.getElementById("result");
const feedback = document.getElementById("feedback"); // 存在しない場合は null
const timerDisplay = document.getElementById("timer"); // タイマー表示用
const adModal = document.getElementById("adModal"); // 広告モーダル
const adConfirmBtn = document.getElementById("adConfirm"); // 広告視聴完了ボタン

let currentSet = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLimit = 0;
let currentLevel = "初級";

// 出題セット（5問）を準備
confirmBtn.addEventListener("click", () => {
  const age = ageSelect.value;
  const genre = genreSelect.value.toLowerCase();
  currentLevel = genre.includes("中級") ? "中級" : genre.includes("上級") ? "上級" : "初級";

  const questionList = questions[age]?.[genre];

  if (questionList && questionList.length >= 5) {
    if (currentLevel === "中級") {
      adModal.style.display = "block";
      return;
    }

    startGame(questionList);
  } else {
    wordSpan.textContent = "⚠️ このジャンルには問題が5問以上必要です";
    inputBox.disabled = true;
    startBtn.disabled = true;
    result.textContent = "";
    if (feedback) feedback.textContent = "";
  }
});

// 広告視聴完了後にゲーム開始
adConfirmBtn.addEventListener("click", () => {
  adModal.style.display = "none";
  const age = ageSelect.value;
  const genre = genreSelect.value.toLowerCase();
  const questionList = questions[age]?.[genre];
  startGame(questionList);
});

function startGame(questionList) {
  const shuffled = questionList.sort(() => Math.random() - 0.5);
  currentSet = shuffled.slice(0, 5);
  currentIndex = 0;
  score = 0;

  inputBox.disabled = false;
  startBtn.disabled = false;
  inputBox.value = "";
  result.textContent = "";
  if (feedback) feedback.textContent = "";

  timeLimit = currentLevel === "初級" ? 0 : currentLevel === "中級" ? 30 : 20;

  showQuestion();
}

// 現在の問題を表示（進捗含む）
function showQuestion() {
  const total = currentSet.length;
  const questionText = currentSet[currentIndex];

  wordSpan.textContent = `第${currentIndex + 1}問（${currentIndex + 1}/${total}問）: ${questionText}`;
  inputBox.value = "";
  if (feedback) feedback.textContent = "";
  result.textContent = "";

  if (timeLimit > 0) {
    startTimer(timeLimit);
  } else {
    timerDisplay.textContent = "";
  }
}

// タイマー開始
function startTimer(seconds) {
  let remaining = seconds;
  timerDisplay.textContent = `⏱ 残り ${remaining} 秒`;
  clearInterval(timer);
  timer = setInterval(() => {
    remaining--;
    timerDisplay.textContent = `⏱ 残り ${remaining} 秒`;
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
