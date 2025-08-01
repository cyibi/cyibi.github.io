<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>章別タイピングゲーム｜無料で楽しくタイピング練習！</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
</head>
<body>
  <!-- ナビゲーション -->
  <nav>
    <a href="index.html">ホーム</a> |
    <a href="howto.html">遊び方</a> |
    <a href="tips.html">上達のコツ</a> |
    <a href="story.html">開発の裏話</a> |
    <a href="privacy.html">プライバシーポリシー</a> |
  </nav>

  <h1>タイピングゲーム</h1>

  <!-- 年齢指定 -->
  <label for="age">対象年齢：</label>
  <select id="age">
    <option value="6">6歳</option>
    <option value="8">8歳</option>
    <option value="10">10歳</option>
    <option value="12">12歳</option>
  </select>

  <!-- ジャンル指定 -->
  <label for="genre">ジャンル：</label>
  <select id="genre">
    <option value="ゲーム">ゲーム</option>
    <option value="アニメ">アニメ</option>
    <option value="動物">動物</option>
    <option value="キャラクター">キャラクター</option>
    <option value="youtube">YouTube</option> <!-- valueを小文字に統一 -->
  </select>

  <!-- 確定ボタン -->
  <button id="confirm">この条件で出題する</button>

  <!-- 出題＆タイピング入力 -->
  <p>お題：<span id="word">ジャンルを選んで確定してください</span></p>
  <input type="text" id="input" placeholder="ここに入力" disabled />

  <!-- スタートボタン -->
  <button id="start" disabled>タイピング開始！</button>
  <p id="result"></p>

  <!-- フィードバック表示 -->
  <p id="feedback" style="color: red; font-weight: bold;"></p>

  <!-- 広告表示エリア -->
  <div style="margin-top: 30px;">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3312473553198083"
      crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-3312473553198083"
      data-ad-slot="3451371793"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>

  <!-- 利用案内 -->
  <p style="margin-top: 40px; font-size: 0.9em; color: #666;">
    ※ 各ジャンルで1000問以上の練習問題が用意されています。条件を選んで楽しくタイピング力を高めましょう！
  </p>

  <!-- JavaScript 読み込み -->
  <script src="questions.js"></script>
  <script src="typing.js"></script>
</body>
</html>
