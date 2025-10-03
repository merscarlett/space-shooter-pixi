import { Application } from 'pixi.js';
import { createBackground } from './game/background';
import { showMenu } from './game/menu';
import { startAsteroidLevel } from './levels/asteroidLevel';

let app;

(async () => {
  app = new Application();
  await app.init({ background: '#000000', width: 1280, height: 720 });
  document.getElementById('pixi-container').appendChild(app.canvas);

  await createBackground(app);
  showMenu(app, 'SPACE SHOOTER', 'Start Game', () => startAsteroidLevel(app));
})();
