import Matter from 'matter-js'
import { config } from './config.js'
import { PhysicsWorld } from './physics.js'

const { Bodies, Body, Events, Vector } = Matter

export class Game {
  constructor(ui) {
    this.ui = ui
    this.physics = new PhysicsWorld(ui.world)
    this.currentItem = null
    this.placedItems = []
    this.score = 0
    this.direction = 1
    this.state = 'ready'
    this.spawnTimeout = null
    this.settleTimeout = null

    Events.on(this.physics.engine, 'beforeUpdate', () => this.moveCurrentItem())
    Events.on(this.physics.engine, 'afterUpdate', () => this.checkForCollapse())
  }

  start() {
    this.restart()
  }

  restart() {
    window.clearTimeout(this.spawnTimeout)
    window.clearTimeout(this.settleTimeout)
    this.physics.reset()
    this.currentItem = null
    this.placedItems = []
    this.score = 0
    this.direction = 1
    this.state = 'playing'
    this.ui.updateScore(this.score)
    this.ui.hideGameOver()
    this.spawnItem()
  }

  spawnItem() {
    if (this.state !== 'playing') return

    const size = config.itemBaseSize * this.randomSizeMultiplier()
    const x = Math.max(size / 2, Math.min(window.innerWidth / 2, window.innerWidth - size / 2))
    this.currentItem = Bodies.rectangle(x, config.spawnHeight, size, size, {
      label: 'falling-item',
      isStatic: true,
      density: config.itemDensity,
      friction: config.itemFriction,
      restitution: config.itemRestitution,
      chamfer: { radius: size * 0.12 },
      render: { fillStyle: this.randomColor() },
    })
    this.currentItem.gameSize = size
    this.physics.addItem(this.currentItem)
    this.ui.showHint('点击屏幕，让它落下！')
  }

  dropCurrentItem() {
    if (this.state !== 'playing' || !this.currentItem || !this.currentItem.isStatic) return

    Body.setStatic(this.currentItem, false)
    this.ui.hideHint()
    const droppedItem = this.currentItem
    this.settleTimeout = window.setTimeout(() => this.waitForSettle(droppedItem), config.settleCheckDelay)
  }

  waitForSettle(item) {
    if (this.state !== 'playing' || this.currentItem !== item) return

    if (Vector.magnitude(item.velocity) <= config.settleVelocityThreshold) {
      this.placedItems.push(item)
      this.currentItem = null
      this.score += 1
      this.ui.updateScore(this.score)
      this.spawnTimeout = window.setTimeout(() => this.spawnItem(), config.nextItemDelay)
      return
    }

    this.settleTimeout = window.setTimeout(() => this.waitForSettle(item), config.settleCheckDelay)
  }

  moveCurrentItem() {
    if (
      this.state !== 'playing' ||
      config.moveMode !== 'auto' ||
      !this.currentItem?.isStatic
    ) {
      return
    }

    const item = this.currentItem
    const halfWidth = item.gameSize / 2
    const minX = config.moveRangePadding + halfWidth
    const maxX = window.innerWidth - config.moveRangePadding - halfWidth
    let nextX = item.position.x + config.moveSpeed * this.direction

    if (nextX <= minX || nextX >= maxX) {
      this.direction *= -1
      nextX = Math.max(minX, Math.min(maxX, nextX))
    }

    Body.setPosition(item, { x: nextX, y: item.position.y })
  }

  nudgeCurrentItem(direction) {
    if (this.state !== 'playing' || !this.currentItem?.isStatic) return

    this.direction = direction
    const halfWidth = this.currentItem.gameSize / 2
    const minX = config.moveRangePadding + halfWidth
    const maxX = window.innerWidth - config.moveRangePadding - halfWidth
    const x = Math.max(
      minX,
      Math.min(maxX, this.currentItem.position.x + direction * config.nudgeDistance),
    )
    Body.setPosition(this.currentItem, { x, y: this.currentItem.position.y })
  }

  checkForCollapse() {
    if (this.state !== 'playing') return

    const activeItem = this.currentItem?.isStatic ? [] : [this.currentItem]
    const outOfBounds = [...this.placedItems, ...activeItem].some((item) => {
      const { x, y } = item.position
      return (
        x < -config.fallOutMargin ||
        x > window.innerWidth + config.fallOutMargin ||
        y > window.innerHeight + config.fallOutMargin
      )
    })

    if (outOfBounds) this.gameOver()
  }

  gameOver() {
    if (this.state !== 'playing') return

    this.state = 'over'
    window.clearTimeout(this.spawnTimeout)
    window.clearTimeout(this.settleTimeout)
    this.currentItem = null
    this.ui.hideHint()
    window.setTimeout(() => this.ui.showGameOver(this.score), config.gameOverDelay)
  }

  randomSizeMultiplier() {
    return 1 + (Math.random() * 2 - 1) * config.itemSizeVariance
  }

  randomColor() {
    return config.itemColors[Math.floor(Math.random() * config.itemColors.length)]
  }
}
