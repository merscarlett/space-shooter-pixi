import { Graphics } from 'pixi.js';

export function createBullet(app, x, y, speedY = -8) {
  const bullet = new Graphics().circle(0, 0, 5).fill('red');

  bullet.x = x;
  bullet.y = y;

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
