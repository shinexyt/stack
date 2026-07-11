export const itemTypes = [
  { name: '西瓜', texture: '/assets/items/watermelon.svg', color: '#7ec850' },
  { name: '马桶', texture: '/assets/items/toilet.svg', color: '#d8e6f1' },
  { name: '企鹅', texture: '/assets/items/penguin.svg', color: '#31445c' },
  { name: '沙发', texture: '/assets/items/sofa.svg', color: '#e0724a' },
  { name: '面包', texture: '/assets/items/bread.svg', color: '#f2bd5c' },
  { name: '橡皮鸭', texture: '/assets/items/duck.svg', color: '#ffd34e' },
]

export function getRandomItemType() {
  return itemTypes[Math.floor(Math.random() * itemTypes.length)]
}
