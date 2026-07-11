import './style.css'
import { Game } from './game.js'
import { setupInput } from './input.js'
import { createGameUi } from './ui.js'

const app = document.querySelector('#app')
const ui = createGameUi(app)
const game = new Game(ui)

setupInput({
  onDrop: () => game.dropCurrentItem(),
  onRestart: () => game.restart(),
  onMove: (direction) => game.nudgeCurrentItem(direction),
})

game.start()
