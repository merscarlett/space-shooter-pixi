import { Assets, Sprite } from 'pixi.js';

export async function createBackground(app) {
  const starTexture = await Assets.load('https://pixijs.com/assets/star.png');
  const starAmount = 300;
  const stars = [];

  for (let i = 0; i < starAmount; i++) {
    const star = new Sprite(starTexture);
    star.anchor.set(0.5);
    star.x = Math.random() * app.screen.width;
    star.y = Math.random() * app.screen.height;
    const scale = 0.03 + Math.random() * 0.03;
    star.scale.set(scale);
    star.alpha = 0.5 + Math.random() * 0.5;

    app.stage.addChild(star);
    stars.push({
      sprite: star,
      speed: 0.2 + Math.random() * 0.2,
      flicker: 0.02 + Math.random() * 0.02,
    });
  }

  app.ticker.add(() => {
    stars.forEach((s) => {
      const star = s.sprite;
      star.y += s.speed;
      if (star.y > app.screen.height) {
        star.y = 0;
        star.x = Math.random() * app.screen.width;
      }
      star.alpha += s.flicker * (Math.random() > 0.5 ? 1 : -1);
      if (star.alpha > 1) star.alpha = 1;
      if (star.alpha < 0.3) star.alpha = 0.3;
    });
  });
}
