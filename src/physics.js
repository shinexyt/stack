import Matter from 'matter-js'
import { config } from './config.js'

const { Bodies, Composite, Engine, Render, Runner } = Matter

export class PhysicsWorld {
  constructor(container) {
    this.container = container
    this.engine = Engine.create()
    this.engine.gravity.y = config.gravityY
    this.runner = Runner.create()
    this.render = Render.create({
      element: container,
      engine: this.engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: config.showColliders,
        background: '#fff7ed',
        pixelRatio: window.devicePixelRatio,
      },
    })

    this.createBounds()
    Render.run(this.render)
    Runner.run(this.runner, this.engine)
  }

  createBounds() {
    const { height } = this.render.options
    const width = config.worldWidth()
    const groundY = height - config.groundHeight / 2

    this.bounds = [
      Bodies.rectangle(
        width / 2,
        groundY,
        width,
        config.groundHeight,
        {
          isStatic: true,
          label: 'ground',
          render: { fillStyle: '#553c2e' },
        },
      ),
    ]
    Composite.add(this.engine.world, this.bounds)
  }

  addItem(item) {
    Composite.add(this.engine.world, item)
  }

  removeItem(item) {
    Composite.remove(this.engine.world, item)
  }

  reset() {
    Composite.clear(this.engine.world, false)
    this.createBounds()
  }

  destroy() {
    Render.stop(this.render)
    Runner.stop(this.runner)
    this.render.canvas.remove()
  }
}
