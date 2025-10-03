import { Assets, Sprite } from 'pixi.js';

let cachedAsteroidTexture = null;

export async function createAsteroid(app, maxY) {
  if (!cachedAsteroidTexture) {
    cachedAsteroidTexture = await Assets.load('/assets/images/asteroid.png');
  }
  const sprite = new Sprite(cachedAsteroidTexture);

  sprite.anchor.set(0.5);
  sprite.scale.set(0.3);

  sprite.x =
    sprite.width / 2 + Math.random() * (app.screen.width - sprite.width);
  sprite.y = sprite.height / 2 + Math.random() * (maxY - sprite.height / 2);

  app.stage.addChild(sprite);

  const minSpeed = 3;
  const maxSpeed = 5;
  const speedX = minSpeed + Math.random() * (maxSpeed - minSpeed);

  const amplitude = 10 + Math.random() * 10;
  const frequency = 0.001 + Math.random() * 0.001;
  const phase = Math.random() * Math.PI * 2;
  const baseY = sprite.y;

  let direction = Math.random() > 0.5 ? 1 : -1;

  const rotationSpeed = (Math.random() - 0.5) * 0.05;
  function update() {
    sprite.x += speedX * direction;
    sprite.y =
      baseY + amplitude * Math.sin(app.ticker.lastTime * frequency + phase);
    sprite.rotation += rotationSpeed;
    if (
      sprite.x - sprite.width / 2 <= 0 ||
      sprite.x + sprite.width / 2 >= app.screen.width
    ) {
      direction *= -1;
      sprite.x += speedX * direction;
    }
  }

  return {
    sprite,
    update,
  };
}
