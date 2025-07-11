const questions = window.questions;
const wordSpan = document.getElementById("word");
const inputField = document.getElementById("input");
const startBtn = document.getElementById("start");
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

startBtn.addEventListener("click", () => {
  const age = document.getElementById("age").value;
  const selectedGenre = document.getElementById("genre").value;
  const genre = genreMap[selectedGenre];
  const wordList = questions?.[age]?.[genre];

  if (!wordList || wordList.length < 5) {
    alert("十分な問題がありません（ジャンルや年齢を見直してください）");
    return;
  }

  selectedSet = shuffleArray(wordList).slice(0, 5);
  currentQuestion = 0;
  score = 0;

  // ✅ 入力欄の設定を明示的に初期化
  inputField.removeAttribute("disabled");
  inputField.setAttribute("autocomplete", "off"); // 入力補完オフ
  inputField.style.visibility = "visible";        // 非表示対策
  inputField.style.pointerEvents = "auto";        // 入力イベントを有効にする
  inputField.value = "";
  inputField.focus();

  wordSpan.textContent = selectedSet[currentQuestion];
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
});

inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

function checkAnswer() {
  const typed = inputField.value.trim();
  const correct = selectedSet[currentQuestion];

  if (typed === correct) score++;

  currentQuestion++;
  inputField.value = "";

  if (currentQuestion < selectedSet.length) {
    wordSpan.textContent = selectedSet[currentQuestion];
  } else {
    clearInterval(timer);
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    result.textContent = `スコア：${score} / 5　時間：${timeTaken}秒`;
    inputField.setAttribute("disabled", "true"); // 入力無効化
  }
}

function updateTimer() {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  result.textContent = `現在のスコア：${score} / ${selectedSet.length}　経過時間：${elapsed}秒`;
}

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
