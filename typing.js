const wordSpan = document.getElementById("word");
const inputField = document.getElementById("input");
const startBtn = document.getElementById("start");
const confirmBtn = document.getElementById("confirm");
const result = document.getElementById("result");

let currentQuestion = 0;
let score = 0;
let selectedSet = [];
let startTime;
let timer;

const genreMap = {
  "ゲーム": "game",
  "アニメ": "anime",
  "動物": "animal",
  "キャラクター": "character",
  "YouTube": "youtube"
};

// 🔹 「この条件で出題する」を押した時の処理
confirmBtn.addEventListener("click", () => {
  const age = document.getElementById("age").value;
  const selectedGenre = document.getElementById("genre").value;
  const genre = genreMap[selectedGenre];
  const wordList = questions?.[age]?.[genre];

  if (!wordList || wordList.length < 5) {
    alert("十分な問題がありません（ジャンルや年齢を見直してください）");
    wordSpan.textContent = "選択された条件では問題が不足しています";
    startBtn.setAttribute("disabled", "true");
    inputField.setAttribute("disabled", "true");
    return;
  }

  selectedSet = shuffleArray(wordList).slice(0, 5);
  currentQuestion = 0;
  score = 0;

  wordSpan.textContent = `お題（1問目）：${selectedSet[currentQuestion]}`;
  result.textContent = "この問題でタイピング開始できます！";

  // 🔸 入力欄を有効化＆カーソルを入れる
  inputField.removeAttribute("disabled");
  inputField.value = "";
  setTimeout(() => inputField.focus(), 50);

  // 🔸 スタートボタン有効化
  startBtn.removeAttribute("disabled");
});

// 🔹 タイピング開始処理（タイマー開始）
startBtn.addEventListener("click", () => {
  inputField.value = "";
  inputField.focus();
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
  result.textContent = "";
});

// 🔹 タイピング入力処理
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

// 🔹 正誤判定と次の出題
function checkAnswer() {
  const typed = inputField.value.trim();
  const correct = selectedSet[currentQuestion];

  if (typed === correct) score++;

  currentQuestion++;
  inputField.value = "";

  if (currentQuestion < selectedSet.length) {
    wordSpan.textContent = `お題（${currentQuestion + 1}問目）：${selectedSet[currentQuestion]}`;
    setTimeout(() => inputField.focus(), 50);
  } else {
    clearInterval(timer);
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    result.textContent = `スコア：${score} / ${selectedSet.length}　時間：${timeTaken}秒`;
    wordSpan.textContent = "おつかれさま！もう一度選んで挑戦できます";
    inputField.setAttribute("disabled", "true");
    startBtn.setAttribute("disabled", "true");
  }
}

// 🔹 タイマー表示更新
function updateTimer() {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  result.textContent = `現在のスコア：${score} / ${selectedSet.length}　経過時間：${elapsed}秒`;
}

// 🔹 配列シャッフル
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
