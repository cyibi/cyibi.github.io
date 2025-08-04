// スコアから称号を判定
export function getBadgeLevel(score) {
  if (score >= 95) return "達人";
  if (score >= 85) return "熟練者";
  if (score >= 70) return "努力家";
  return "挑戦者";
}

// SVGバッジ生成・表示
export function renderBadge(score) {
  const badge = getBadgeLevel(score);
  const svg = `<svg width="240" height="60"><text x="20" y="38" font-size="24" fill="#333">称号: ${badge}</text></svg>`;
  document.getElementById("badge-area").innerHTML = svg;
}
