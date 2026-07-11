export const config = {
  gravityY: 1.0,
  itemDensity: 0.001,
  itemFriction: 0.6,
  itemRestitution: 0.1,
  worldWidth: () => window.innerWidth,

  itemBaseSize: 80,
  itemSizeVariance: 0.2,
  spawnHeight: 100,
  nextItemDelay: 400,

  moveMode: 'auto',
  moveSpeed: 3,
  moveRangePadding: 40,

  fallOutMargin: 60,
  settleVelocityThreshold: 0.3,
  settleCheckDelay: 800,

  cameraFollowSpeed: 0.08,
  cameraTopOffset: 200,
  screenShakeIntensity: 8,
  screenShakeDuration: 300,
  slowMotionScale: 0.3,
  slowMotionDuration: 1000,

  masterVolume: 0.8,
  sfxVolume: 1.0,
  showColliders: false,
  usePlaceholderArt: false,

  groundHeight: 54,
  wallThickness: 80,
  gameOverDelay: 500,
  nudgeDistance: 28,
  itemColors: ['#ff715b', '#ffcb47', '#5bc0eb', '#8ac926', '#b388eb', '#ff8fab'],
}
