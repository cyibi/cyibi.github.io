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

// ✅ 選択条件を確定してお題表示（スタート前）
confirmBtn.addEventListener("click", () => {
  const age = document.getElementById("age").value;
  const selectedGenre = document.getElementById("genre").value;
  const genre = genreMap[selectedGenre];
  const wordList = questions?.[age]?.[genre];

  if (!wordList || wordList.length < 5) {
    alert("十分な問題がありません（ジャンルや年齢を見直してください）");
    startBtn.setAttribute("disabled", "true");
    wordSpan.textContent = "選択を見直してください";
    return;
  }

  selectedSet = shuffleArray(wordList).slice(0, 5);
  currentQuestion = 0;
  score = 0;
  wordSpan.textContent = `お題（1問目）：${selectedSet[0]}`;
  startBtn.removeAttribute("disabled");
  inputField.setAttribute("disabled", "true");
  result.textContent = "このお題でスタートを押すとタイピング開始！";
});

// ✅ タイピング開始（入力欄有効＆タイマー開始）
startBtn.addEventListener("click", () => {
  inputField.removeAttribute("disabled");
  inputField.setAttribute("autocomplete", "off");
  inputField.style.visibility = "visible";
  inputField.style.pointerEvents = "auto";
  inputField.value = "";

  setTimeout(() => inputField.focus(), 50);

  wordSpan.textContent = selectedSet[currentQuestion];
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
  result.textContent = ""; // スコア表示エリア初期化
});

// ✅ タイピング入力処理（Enterで判定）
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

// ✅ 正誤判定＆次の出題へ
function checkAnswer() {
  const typed = inputField.value.trim();
  const correct = selectedSet[currentQuestion];

  if (typed === correct) score++;

  currentQuestion++;
  inputField.value = "";

  if (currentQuestion < selectedSet.length) {
    wordSpan.textContent = selectedSet[currentQuestion];
    setTimeout(() => inputField.focus(), 50);
  } else {
    clearInterval(timer);
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    result.textContent = `スコア：${score} / ${selectedSet.length}　時間：${timeTaken}秒`;
    inputField.setAttribute("disabled", "true");
    wordSpan.textContent = "終了！もう一度選び直してね";
    startBtn.setAttribute("disabled", "true");
  }
}

// ✅ 経過時間の表示更新
function updateTimer() {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  result.textContent = `現在のスコア：${score} / ${selectedSet.length}　経過時間：${elapsed}秒`;
}

// ✅ 問題シャッフル関数
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
