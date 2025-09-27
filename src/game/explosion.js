import { Graphics, Container } from 'pixi.js';

export function createExplosion(app, x, y) {
  const explosionContainer = new Container();
  app.stage.addChild(explosionContainer);

  const particles = [];
  for (let i = 0; i < 40; i++) {
    const p = new Graphics().circle(0, 0, 4).fill(0xffffff);
    p.x = x;
    p.y = y;
    explosionContainer.addChild(p);

    particles.push({
      sprite: p,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      life: 20 + Math.random() * 10,
    });
  }

  const tickerCallback = () => {
    particles.forEach((p) => {
      p.sprite.x += p.vx;
      p.sprite.y += p.vy;
      p.sprite.alpha = p.life / 30;
      p.life--;
    });

    if (particles.every((p) => p.life <= 0)) {
      app.stage.removeChild(explosionContainer);
      app.ticker.remove(tickerCallback);
    }
  };

  app.ticker.add(tickerCallback);
}
