// 要素の取得
const confirmBtn = document.getElementById("confirm");
const ageSelect = document.getElementById("age");
const genreSelect = document.getElementById("genre");
const wordSpan = document.getElementById("word");
const inputBox = document.getElementById("input");
const startBtn = document.getElementById("start");
const result = document.getElementById("result");
const feedback = document.getElementById("feedback");

let currentQuestion = "";

// 問題を選択する処理
confirmBtn.addEventListener("click", () => {
  const age = ageSelect.value;
  const genre = genreSelect.value.toLowerCase();

  const questionList = questions[age]?.[genre];

  if (questionList && questionList.length > 0) {
    const randomIndex = Math.floor(Math.random() * questionList.length);
    currentQuestion = questionList[randomIndex];
    wordSpan.textContent = currentQuestion;

    inputBox.disabled = false;
    startBtn.disabled = false;
    inputBox.value = "";
    result.textContent = "";
    feedback.textContent = "";
  } else {
    wordSpan.textContent = "ジャンルに一致する問題が見つかりません";
    inputBox.disabled = true;
    startBtn.disabled = true;
  }
});

// タイピング開始時の処理
startBtn.addEventListener("click", () => {
  const userInput = inputBox.value.trim();

  if (userInput === "") {
    feedback.textContent = "入力欄が空です。まずは入力してみましょう！";
    return;
  }

  if (userInput === currentQuestion) {
    result.textContent = "✅ 正解！よくできました！";
    result.style.color = "green";
  } else {
    result.textContent = `❌ 間違いです。正しくは「${currentQuestion}」です。`;
    result.style.color = "red";
  }

  // 入力欄と開始ボタンを無効化（次の出題まで）
  inputBox.disabled = true;
  startBtn.disabled = true;
});
