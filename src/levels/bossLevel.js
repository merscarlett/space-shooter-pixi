import { createBackground } from '../game/background';
import { createHUD } from '../game/hud';
import { createPlayer } from '../game/player';
import { createBullet } from '../game/bullet';
import { createBoss } from '../game/boss';
import { setupPlayerControls } from '../game/controls';
import { isColliding, isCollidingTriangle, updateBulletsAndCollisions } from '../game/collision';
import { showMenu } from '../game/menu';
import { startAsteroidLevel } from './asteroidLevel';

export async function startBossLevel(app) {
  app.stage.removeChildren();
  await createBackground(app);

  const maxBullets = 10;
  const timeLeft = 60;
  const { timerText, getRemainingTime, updateBullets } =
    createHUD(app, maxBullets, timeLeft);

  const player = await createPlayer(app);
  const bullets = [];
  const readyToShoot = { value: true };
  const shotsFired = { value: 0 };
  const gameEnded = { value: false };

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

  const boss = await createBoss(app);
  const bossBullets = [];

  const bossShootInterval = setInterval(() => {
    if (!gameEnded.value) {
      const bullet = createBullet(
        app,
        boss.sprite.x,
        boss.sprite.y + boss.sprite.height / 2,
        5
      ); 
      bossBullets.push(bullet);
    }
  }, 2000);

  const tickerCallback = () => {
    if (gameEnded.value) {
      clearInterval(bossShootInterval);
      app.ticker.remove(tickerCallback);
      return;
    }

    const remaining = getRemainingTime();
    timerText.text = `Time: ${remaining}`;
    if (remaining <= 0) {
      gameEnded.value = true;
      clearInterval(bossShootInterval);
      showMenu(app, 'YOU LOSE', 'New Game', () => startAsteroidLevel(app));
      return;
    }

    updateBulletsAndCollisions(
      bullets,
      [boss],
      (b) => {
        b.hit();
        const originalTint = b.sprite.tint;
        b.sprite.tint = 0xff0000;
        setTimeout(() => {
          if (!b.sprite.destroyed) b.sprite.tint = originalTint;
        }, 100);

        if (b.getHP() <= 0) {
          gameEnded.value = true;
          clearInterval(bossShootInterval);
          showMenu(app, 'YOU WIN', 'New Game', () => startAsteroidLevel(app));
        }
      },
      app
    );

    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = bossBullets.length - 1; j >= 0; j--) {
        if (isColliding(bullets[i].sprite, bossBullets[j].sprite)) {
          app.stage.removeChild(bullets[i].sprite);
          app.stage.removeChild(bossBullets[j].sprite);
          bullets.splice(i, 1);
          bossBullets.splice(j, 1);
          break;
        }
      }
    }

    for (let i = bossBullets.length - 1; i >= 0; i--) {
      const bullet = bossBullets[i];
      if (isCollidingTriangle(bullet.sprite, player.sprite)) {
        gameEnded.value = true;
        clearInterval(bossShootInterval);
        showMenu(app, 'YOU LOSE', 'New Game', () => startAsteroidLevel(app));
        return;
      }
      const alive = bullet.update();
      if (!alive) {
        app.stage.removeChild(bullet.sprite);
        bossBullets.splice(i, 1);
      }
    }

    if (shotsFired.value >= maxBullets && boss.getHP() > 0) {
      gameEnded.value = true;
      clearInterval(bossShootInterval);
      showMenu(app, 'YOU LOSE', 'New Game', () => startAsteroidLevel(app));
      return;
    }

    boss.update();
  };

  app.ticker.add(tickerCallback);
}
