import { createBullet } from './bullet';

export function setupPlayerControls(
  app,
  player,
  bullets,
  maxBullets,
  readyToShoot,
  shotsFiredObj,
  updateBulletsCallback,
  gameEndedObj
) {
  window.addEventListener('keydown', (e) => {
    if (!player || gameEndedObj.value) return;

    if (e.code === 'ArrowLeft') player.moveLeft();
    if (e.code === 'ArrowRight') player.moveRight();

    if (e.code === 'Space' && readyToShoot.value) {
      if (shotsFiredObj.value < maxBullets) {
        const b = createBullet(
          app,
          player.sprite.x,
          player.sprite.y - player.sprite.height / 2,
          -8
        );
        bullets.push(b);
        shotsFiredObj.value++;
        updateBulletsCallback(shotsFiredObj.value);
        readyToShoot.value = false;
      }
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') readyToShoot.value = true;
  });
}
