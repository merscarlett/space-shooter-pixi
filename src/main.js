import { Application } from 'pixi.js';
import { createBackground } from './game/background';
import { showMenu } from './game/menu';
import { clearScene, registerSceneCleanup } from './game/scene';
import { startAsteroidLevel } from './levels/asteroidLevel';

let app;

(async () => {
  app = new Application();
  await app.init({
    background: '#000000',
    width: 1280,
    height: 720,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    autoDensity: true,
  });

  const container = document.getElementById('pixi-container');
  container.appendChild(app.canvas);
  app.canvas.style.width = '100%';
  app.canvas.style.height = '100%';

  registerSceneCleanup(app, await createBackground(app));
  showMenu(app, 'SPACE SHOOTER', 'Start Game', () => {
    clearScene(app);
    startAsteroidLevel(app);
  });
})();
