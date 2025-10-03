import { Graphics, Container } from 'pixi.js';

export function createExplosion(app, x, y) {
  const particles = [];

  const explosionContainer = new Container();
  app.stage.addChild(explosionContainer);

  for (let i = 0; i < 30; i++) {
    const radius = 5 + Math.random() * 5;
    const shade = 80 + Math.random() * 50;
    const grayShade = (shade << 16) | (shade << 8) | shade;
    const p = new Graphics().circle(0, 0, radius).fill(grayShade);
    p.x = x;
    p.y = y;
    explosionContainer.addChild(p);

    particles.push({
      sprite: p,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      life: 25 + Math.random() * 10,
      radius,
    });
  }

  for (let i = 0; i < 30; i++) {
    const radius = 2 + Math.random() * 3;
    const p = new Graphics().circle(0, 0, radius).fill(0xffffff);
    p.x = x;
    p.y = y;
    p.alpha = 0.08 + Math.random() * 0.08;
    explosionContainer.addChild(p);

    particles.push({
      sprite: p,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      life: 30 + Math.random() * 15,
      radius,
    });
  }

  const tickerCallback = () => {
    particles.forEach((p) => {
      p.sprite.x += p.vx;
      p.sprite.y += p.vy;

      const alpha = p.life / 40;
      p.sprite.alpha = alpha > 0 ? alpha : 0;
      p.sprite.scale.set(alpha);

      p.life--;
    });

    if (particles.every((p) => p.life <= 0)) {
      if (explosionContainer.parent === app.stage) {
        app.stage.removeChild(explosionContainer);
      }
      app.ticker.remove(tickerCallback);
    }
  };

  app.ticker.add(tickerCallback);
}
