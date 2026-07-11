export function setupInput({ onDrop, onRestart, onMove }) {
  document.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) {
      onRestart()
      return
    }
    onDrop()
  })

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      event.preventDefault()
      onDrop()
    }
    if (event.code === 'ArrowLeft') {
      event.preventDefault()
      onMove(-1)
    }
    if (event.code === 'ArrowRight') {
      event.preventDefault()
      onMove(1)
    }
  })
}
