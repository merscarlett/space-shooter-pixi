import { Graphics, BlurFilter } from 'pixi.js';

export function createBullet(app, x, y, speedY = -5) {
  const bullet = new Graphics()
    .circle(0, 0, 5)
    .fill('white')
    .stroke({ width: 3, color: 0xcc0000 });

  bullet.x = x;
  bullet.y = y;
  bullet.filters = [new BlurFilter({ strength: 2 })];
  app.stage.addChild(bullet);
  
  return {
    sprite: bullet,
    update: () => {
      bullet.y += speedY;
      if (bullet.y < 0 || bullet.y > app.screen.height) {
        app.stage.removeChild(bullet);
        return false;
      }
      return true;
    },
  };
}
