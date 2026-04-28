import { Assets, Sprite } from 'pixi.js';

let cachedPlayerTexture = null;

export async function createPlayer(app) {
  if (!cachedPlayerTexture) {
    cachedPlayerTexture = await Assets.load('/assets/images/spaceship.png');
  }

  const sprite = new Sprite(cachedPlayerTexture);
  sprite.anchor.set(0.5);
  sprite.scale.set(0.12);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height - sprite.height / 2 - 10;
  app.stage.addChild(sprite);

  const speed = 15;
  const clampX = (x) =>
    Math.min(
      app.screen.width - sprite.width / 2,
      Math.max(sprite.width / 2, x)
    );

  return {
    sprite,
    moveLeft: () => {
      sprite.x = clampX(sprite.x - speed);
    },
    moveRight: () => {
      sprite.x = clampX(sprite.x + speed);
    },
    setX: (x) => {
      sprite.x = clampX(x);
    },
  };
}
