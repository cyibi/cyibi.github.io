const words = ["apple", "banana", "keyboard", "computer", "javascript", "programming", "github"];
let currentWord = "";

const wordDisplay = document.getElementById("word");
const input = document.getElementById("input");
const result = document.getElementById("result");
const startBtn = document.getElementById("start");

function newWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordDisplay.textContent = currentWord;
  input.value = "";
  result.textContent = "";
  input.focus();
}

function checkWord() {
  const typed = input.value.trim();
  if (typed === currentWord) {
    result.textContent = "正解！";
  } else {
    result.textContent = "不正解…";
  }
  setTimeout(newWord, 1000);
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkWord();
});

startBtn.addEventListener("click", () => {
  input.disabled = false;
  newWord();
});
