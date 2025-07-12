// ✅ 要素取得
const wordSpan = document.getElementById("word");
const inputField = document.getElementById("input");
const startBtn = document.getElementById("start");
const confirmBtn = document.getElementById("confirm");
const result = document.getElementById("result");

// ✅ 定数：最低出題数と出題数設定
const MIN_QUESTIONS = 5;
const QUESTION_COUNT = 5; // 必要に応じて10や20に変更可能

// ✅ 初期変数
let currentQuestion = 0;
let score = 0;
let selectedSet = [];
let startTime;
let timer;

// ✅ ジャンルマップ（日本語→英語）
const genreMap = {
  "ゲーム": "game",
  "アニメ": "anime",
  "動物": "animal",
  "キャラクター": "character",
  "YouTube": "youtube"
};

// ✅ 「この条件で出題する」ボタンの処理
confirmBtn.addEventListener("click", () => {
  const age = document.getElementById("age").value;
  const genreText = document.getElementById("genre").value;
  const genre = genreMap[genreText];
  const wordList = questions?.[age]?.[genre];

  if (!wordList || wordList.length < MIN_QUESTIONS) {
    wordSpan.textContent = `「${genreText}」ジャンルの問題が${MIN_QUESTIONS}問以上ありません`;
    startBtn.disabled = true;
    inputField.disabled = true;
    return;
  }

  // ランダム選択
  selectedSet = shuffleArray(wordList).slice(0, QUESTION_COUNT);
  currentQuestion = 0;
  score = 0;

  wordSpan.textContent = `お題（1 / ${selectedSet.length}）：${selectedSet[0]}`;
  result.textContent = "このお題でタイピングできます";

  inputField.disabled = false;
  inputField.value = "";
  setTimeout(() => inputField.focus(), 50);

  startBtn.disabled = false;
});

// ✅ 「タイピング開始！」ボタンの処理
startBtn.addEventListener("click", () => {
  inputField.value = "";
  inputField.focus();
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
  result.textContent = "";
});

// ✅ タイピング判定（Enterキー）
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

// ✅ 答えチェック＆次へ
function checkAnswer() {
  const typed = inputField.value.trim();
  const correct = selectedSet[currentQuestion];

  if (typed === correct) score++;

  currentQuestion++;
  inputField.value = "";

  if (currentQuestion < selectedSet.length) {
    wordSpan.textContent = `お題（${currentQuestion + 1} / ${selectedSet.length}）：${selectedSet[currentQuestion]}`;
    setTimeout(() => inputField.focus(), 50);
  } else {
    clearInterval(timer);
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    result.textContent = `スコア：${score} / ${selectedSet.length}　時間：${timeTaken}秒`;
    wordSpan.textContent = "おつかれさま！もう一度条件を選んで挑戦できます";
    inputField.disabled = true;
    startBtn.disabled = true;
  }
}

// ✅ 時間表示更新
function updateTimer() {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  result.textContent = `現在のスコア：${score} / ${selectedSet.length}　経過時間：${elapsed}秒`;
}

// ✅ 配列シャッフル関数
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
