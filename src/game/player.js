import { Assets, Sprite } from 'pixi.js';

export async function createPlayer(app) {
  const texture = await Assets.load('/assets/images/spaceship.png');
  const sprite = new Sprite(texture);

  sprite.anchor.set(0.5);
  sprite.scale.set(0.12);

  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height - sprite.height / 2 - 10;

  app.stage.addChild(sprite);
  const speed = 15;

  return {
    sprite,
    moveLeft: () => {
      sprite.x -= speed;
      if (sprite.x - sprite.width / 2 < 0) sprite.x = sprite.width / 2;
    },
    moveRight: () => {
      sprite.x += speed;
      if (sprite.x + sprite.width / 2 > app.screen.width)
        sprite.x = app.screen.width - sprite.width / 2;
    },
  };
}
