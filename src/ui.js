export function createGameUi(app) {
  app.innerHTML = `
    <main class="game-shell">
      <div class="hud" aria-live="polite">
        <span class="game-title">叠叠翻车</span>
        <span class="score-label">层数 <strong id="score">0</strong></span>
      </div>
      <div id="game-world" aria-label="叠叠翻车游戏画面"></div>
      <p id="hint" class="hint">点击屏幕，让它落下！</p>
      <section id="game-over" class="game-over" hidden>
        <p id="crash-message">翻车！</p>
        <span>你叠了 <strong id="final-score">0</strong> 层</span>
        <button type="button">再试一次</button>
      </section>
      <p class="controls">点击 / 空格：落下　← →：微调方向</p>
    </main>
  `

  const score = app.querySelector('#score')
  const hint = app.querySelector('#hint')
  const gameOver = app.querySelector('#game-over')
  const finalScore = app.querySelector('#final-score')
  const shell = app.querySelector('.game-shell')

  return {
    world: app.querySelector('#game-world'),
    updateScore: (value) => {
      score.textContent = value
    },
    showHint: (message) => {
      hint.textContent = message
      hint.hidden = false
    },
    hideHint: () => {
      hint.hidden = true
    },
    showGameOver: (value) => {
      finalScore.textContent = value
      gameOver.hidden = false
    },
    hideGameOver: () => {
      gameOver.hidden = true
    },
    shake: (intensity, duration) => {
      shell.style.setProperty('--shake-distance', `${intensity}px`)
      shell.classList.remove('is-shaking')
      window.requestAnimationFrame(() => shell.classList.add('is-shaking'))
      window.setTimeout(() => shell.classList.remove('is-shaking'), duration)
    },
  }
}
