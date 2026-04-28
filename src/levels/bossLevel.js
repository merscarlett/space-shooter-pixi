import { Container } from 'pixi.js';
import { createBackground } from '../game/background';
import { createLevelIntro } from '../game/intro';
import { createHUD } from '../game/hud';
import { createPlayer } from '../game/player';
import { createBullet } from '../game/bullet';
import { createBoss } from '../game/boss';
import { setupPlayerControls } from '../game/controls';
import {
  isColliding,
  isCollidingTriangle,
  updateBulletsAndCollisions,
} from '../game/collision';
import { showMenu } from '../game/menu';
import { clearScene, registerSceneCleanup } from '../game/scene';
import { startAsteroidLevel } from './asteroidLevel';

export async function startBossLevel(app) {
  clearScene(app);
  registerSceneCleanup(app, await createBackground(app));

  const showIntro = createLevelIntro(app);
  await showIntro('BOSS LEVEL');

  const maxBullets = 10;
  const timeLeft = 60;
  const { getRemainingTime, updateBullets, updateTimer } = createHUD(
    app,
    maxBullets,
    timeLeft
  );

  const bossBulletContainer = new Container();
  app.stage.addChild(bossBulletContainer);

  const player = await createPlayer(app);
  const bullets = [];
  const readyToShoot = { value: true };
  const shotsFired = { value: 0 };
  const gameEnded = { value: false };

  registerSceneCleanup(
    app,
    setupPlayerControls(
      app,
      player,
      bullets,
      maxBullets,
      readyToShoot,
      shotsFired,
      updateBullets,
      gameEnded
    )
  );

  const boss = await createBoss(app);
  boss.sprite.isBoss = true;
  const bossBullets = [];

  const bossShootInterval = setInterval(() => {
    if (!gameEnded.value) {
      const bullet = createBullet(
        app,
        boss.sprite.x,
        boss.sprite.y + boss.sprite.height / 2,
        5
      );
      bossBulletContainer.addChild(bullet.sprite);
      bossBullets.push(bullet);
    }
  }, 2000);
  registerSceneCleanup(app, () => clearInterval(bossShootInterval));

  const showGameOver = async (message) => {
    clearScene(app);
    registerSceneCleanup(app, await createBackground(app));
    showMenu(app, message, 'New Game', () => startAsteroidLevel(app));
  };

  const tickerCallback = () => {
    if (gameEnded.value) {
      return;
    }

    const remaining = getRemainingTime();
    updateTimer(remaining);
    if (remaining <= 0) {
      gameEnded.value = true;
      void showGameOver('YOU LOSE');
      return;
    }

    updateBulletsAndCollisions(bullets, [boss], (b) => {
      b.hit();

      const sprite = b.sprite;
      const isDefeated = b.getHP() <= 0;

      if (!sprite.hitAnim) {
        const originalScale = sprite.scale.x;
        const originalY = sprite.y;

        let animFrame = 0;
        const totalFrames = 8;
        sprite.hitAnim = true;

        const tickerCallback = () => {
          animFrame++;
          sprite.y =
            originalY + Math.sin((animFrame / totalFrames) * Math.PI) * -10;
          const scaleFactor =
            1 + Math.sin((animFrame / totalFrames) * Math.PI) * 0.1;
          sprite.scale.set(originalScale * scaleFactor);

          if (animFrame % 2 === 0) sprite.tint = 0xff0000;
          else sprite.tint = 0xffffff;

          if (animFrame >= totalFrames) {
            sprite.y = originalY;
            sprite.scale.set(originalScale);
            sprite.tint = 0xffffff;
            app.ticker.remove(tickerCallback);
            sprite.hitAnim = false;
          }
        };

        app.ticker.add(tickerCallback);
        registerSceneCleanup(app, () => app.ticker.remove(tickerCallback));
      }

      if (isDefeated) {
        gameEnded.value = true;
        void showGameOver('YOU WIN');
      }
    });
    if (gameEnded.value) return;

    for (let i = bullets.length - 1; i >= 0; i--) {
      for (let j = bossBullets.length - 1; j >= 0; j--) {
        if (isColliding(bullets[i].sprite, bossBullets[j].sprite)) {
          bullets[i].sprite.parent?.removeChild(bullets[i].sprite);
          bossBullets[j].sprite.parent?.removeChild(bossBullets[j].sprite);
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
        void showGameOver('YOU LOSE');
        return;
      }
      const alive = bullet.update();
      if (!alive) {
        bossBullets.splice(i, 1);
      }
    }

    if (
      shotsFired.value >= maxBullets &&
      bullets.length === 0 &&
      boss.getHP() > 0
    ) {
      gameEnded.value = true;
      void showGameOver('YOU LOSE');
      return;
    }

    boss.update();
  };

  app.ticker.add(tickerCallback);
  registerSceneCleanup(app, () => app.ticker.remove(tickerCallback));
}
