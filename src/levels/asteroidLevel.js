import { Container } from 'pixi.js';
import { createBackground } from '../game/background';
import { createLevelIntro } from '../game/intro';
import { createHUD } from '../game/hud';
import { createPlayer } from '../game/player';
import { createAsteroid } from '../game/asteroid';
import { createExplosion } from '../game/explosion';
import { setupPlayerControls } from '../game/controls';
import { updateBulletsAndCollisions } from '../game/collision';
import { showMenu } from '../game/menu';
import { startBossLevel } from './bossLevel';

export async function startAsteroidLevel(app) {
  app.stage.removeChildren();
  await createBackground(app);

  const showIntro = createLevelIntro(app);
  await showIntro('ASTEROID LEVEL');

  const maxBullets = 10;
  const timeLeft = 60;
  const { timerText, getRemainingTime, updateBullets } = createHUD(
    app,
    maxBullets,
    timeLeft
  );

  const asteroidContainer = new Container();
  const explosionContainer = new Container();
  app.stage.addChild(asteroidContainer);
  app.stage.addChild(explosionContainer);

  const player = await createPlayer(app);
  const bullets = [];
  const readyToShoot = { value: true };
  const gameEnded = { value: false };
  const shotsFired = { value: 0 };

  setupPlayerControls(
    app,
    player,
    bullets,
    maxBullets,
    readyToShoot,
    shotsFired,
    updateBullets,
    gameEnded
  );

  const asteroids = [];
  for (let i = 0; i < 6; i++) {
    const asteroid = await createAsteroid(
      app,
      player.sprite.y - player.sprite.height / 2 - 70
    );
    asteroidContainer.addChild(asteroid.sprite);
    asteroids.push(asteroid);
  }

  app.ticker.add(() => {
    if (gameEnded.value) return;

    const remaining = getRemainingTime();
    timerText.text = `Time: ${remaining}`;
    if (remaining <= 0) {
      gameEnded.value = true;
      showMenu(app, 'YOU LOSE', 'New Game', () => startAsteroidLevel(app));
      return;
    }

    updateBulletsAndCollisions(
      bullets,
      asteroids,
      (a) => {
        createExplosion(app, a.sprite.x, a.sprite.y);
        asteroidContainer.removeChild(a.sprite);
        asteroids.splice(asteroids.indexOf(a), 1);
      },
      app
    );

    if (
      shotsFired.value >= maxBullets &&
      bullets.length === 0 &&
      asteroids.length > 0
    ) {
      gameEnded.value = true;
      showMenu(app, 'YOU LOSE', 'New Game', () => startAsteroidLevel(app));
    }

    if (asteroids.length === 0 && !gameEnded.value) {
      gameEnded.value = true;
      setTimeout(() => startBossLevel(app), 300);
    }

    asteroids.forEach((a) => a.update());
  });
}
