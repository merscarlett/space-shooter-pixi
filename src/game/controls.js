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
  let pointerActive = false;

  const shoot = () => {
    if (!readyToShoot.value || shotsFiredObj.value >= maxBullets) return;

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
  };

  const moveToPointer = (e) => {
    const rect = app.canvas.getBoundingClientRect();
    const pointerX = ((e.clientX - rect.left) / rect.width) * app.screen.width;
    player.setX(pointerX);
  };

  const onKeyDown = (e) => {
    if (!player || gameEndedObj.value) return;

    if (
      e.code === 'ArrowLeft' ||
      e.code === 'ArrowRight' ||
      e.code === 'Space'
    ) {
      e.preventDefault();
    }

    if (e.code === 'ArrowLeft') player.moveLeft();
    if (e.code === 'ArrowRight') player.moveRight();
    if (e.code === 'Space') shoot();
  };

  const onKeyUp = (e) => {
    if (e.code === 'Space') readyToShoot.value = true;
  };

  const onPointerDown = (e) => {
    if (gameEndedObj.value) return;
    pointerActive = true;
    moveToPointer(e);
    shoot();
  };

  const onPointerMove = (e) => {
    if (gameEndedObj.value || !pointerActive) return;
    moveToPointer(e);
  };

  const onPointerUp = () => {
    pointerActive = false;
    readyToShoot.value = true;
  };

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  app.canvas.addEventListener('pointerdown', onPointerDown);
  app.canvas.addEventListener('pointermove', onPointerMove);
  app.canvas.addEventListener('pointerup', onPointerUp);
  app.canvas.addEventListener('pointercancel', onPointerUp);
  app.canvas.addEventListener('pointerleave', onPointerUp);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    app.canvas.removeEventListener('pointerdown', onPointerDown);
    app.canvas.removeEventListener('pointermove', onPointerMove);
    app.canvas.removeEventListener('pointerup', onPointerUp);
    app.canvas.removeEventListener('pointercancel', onPointerUp);
    app.canvas.removeEventListener('pointerleave', onPointerUp);
  };
}
