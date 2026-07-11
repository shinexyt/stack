import Matter from 'matter-js'

const { Bodies } = Matter

export const itemTypes = [
  {
    name: '西瓜',
    texture: '/assets/items/watermelon.svg',
    color: '#7ec850',
    collider: { type: 'circle', radius: 0.4, spriteYOffset: 0.37, description: '半圆瓜瓤，使用圆形近似' },
  },
  {
    name: '马桶',
    texture: '/assets/items/toilet.svg',
    color: '#d8e6f1',
    collider: { type: 'rectangle', width: 0.58, height: 0.68, spriteYOffset: 0.58, description: '水箱和坐便器组成的直立矩形' },
  },
  {
    name: '企鹅',
    texture: '/assets/items/penguin.svg',
    color: '#31445c',
    collider: { type: 'polygon', sides: 12, radius: 0.37, spriteYOffset: 0.57, description: '椭圆身体，使用 12 边形近似' },
  },
  {
    name: '沙发',
    texture: '/assets/items/sofa.svg',
    color: '#e0724a',
    collider: { type: 'rectangle', width: 0.82, height: 0.55, spriteYOffset: 0.58, description: '宽底座和靠背，使用横向矩形' },
  },
  {
    name: '面包',
    texture: '/assets/items/bread.svg',
    color: '#f2bd5c',
    collider: { type: 'polygon', sides: 8, radius: 0.42, spriteYOffset: 0.53, description: '圆顶吐司，使用 8 边形近似' },
  },
  {
    name: '橡皮鸭',
    texture: '/assets/items/duck.svg',
    color: '#ffd34e',
    collider: { type: 'polygon', sides: 7, radius: 0.4, spriteYOffset: 0.45, description: '头部和身体的凸轮廓，使用 7 边形近似' },
  },
]

export function getRandomItemType() {
  return itemTypes[Math.floor(Math.random() * itemTypes.length)]
}

export function createItemBody(itemType, { x, y, size, options }) {
  const { collider } = itemType

  if (collider.type === 'circle') {
    return Bodies.circle(x, y, size * collider.radius, options)
  }

  if (collider.type === 'polygon') {
    return Bodies.polygon(x, y, collider.sides, size * collider.radius, options)
  }

  return Bodies.rectangle(x, y, size * collider.width, size * collider.height, {
    ...options,
    chamfer: { radius: size * 0.08 },
  })
}
