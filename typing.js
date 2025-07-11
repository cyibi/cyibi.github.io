const questions = {
  "6": {
    "animal": ["いぬ", "ねこ", "うさぎ", "ぞう", "とり"],
    "game": ["かくれんぼ", "すごろく", "おにごっこ", "たからさがし"]
  },
  "8": {
    "game": ["マインクラフト", "フォートナイト", "マリオ", "ゼルダ"],
    "anime": ["ドラえもん", "ポケモン", "クレヨンしんちゃん", "名探偵コナン"]
  }
};

let currentQuestion = 0;
let score = 0;
let startTime;
let timer;
let selectedSet = [];

const wordSpan = document.getElementById("word");
const inputField = document.getElementById("input");
const startBtn = document.getElementById("start");
const result = document.getElementById("result");

startBtn.addEventListener("click", () => {
  const age = document.getElementById("age").value;
  const genre = document.getElementById("genre").value;
  selectedSet = [...(questions[age]?.[genre] || [])];

  if (selectedSet.length < 5) {
    alert("十分な問題がありません");
    return;
  }

  selectedSet = shuffleArray(selectedSet).slice(0, 5);
  currentQuestion = 0;
  score = 0;
  inputField.disabled = false;
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

  if (typed === correct) {
    score++;
  }

  currentQuestion++;
  inputField.value = "";

  if (currentQuestion < selectedSet.length) {
    wordSpan.textContent = selectedSet[currentQuestion];
  } else {
    clearInterval(timer);
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    result.textContent = `スコア：${score} / 5　時間：${timeTaken}秒`;
    inputField.disabled = true;
  }
}

function updateTimer() {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  result.textContent = `現在のスコア：${score} / ${selectedSet.length}　経過時間：${elapsed}秒`;
}

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}