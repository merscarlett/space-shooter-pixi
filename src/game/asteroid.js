import { Assets, Sprite } from 'pixi.js';

export async function createAsteroid(app, maxY) {
  const texture = await Assets.load('/assets/images/asteroid.png');
  const sprite = new Sprite(texture);

  sprite.anchor.set(0.5);
  sprite.scale.set(0.3);

  sprite.x =
    sprite.width / 2 + Math.random() * (app.screen.width - sprite.width);

  const minY = 30 + sprite.height / 2;
  sprite.y = minY + Math.random() * (maxY - minY);

  app.stage.addChild(sprite);

  const speedX = 3;
  let direction = Math.random() > 0.5 ? 1 : -1;

  return {
    sprite,
    update: () => {
      sprite.x += speedX * direction;

      if (
        sprite.x - sprite.width / 2 <= 0 ||
        sprite.x + sprite.width / 2 >= app.screen.width
      ) {
        direction *= -1;
        sprite.x += speedX * direction;
      }
    },
  };
}
