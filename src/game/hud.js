import { Text } from 'pixi.js';

export function createHUD(app, maxBullets, timeLeft) {
  const bulletsCounter = new Text({
    text: `Bullets: ${maxBullets} / ${maxBullets}`,
    style: {
      fill: '#1a3892ff',
      stroke: '#ffffff',
      strokeThickness: 2,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Courier New',
    },
  });
  bulletsCounter.x = 20;
  bulletsCounter.y = 20;
  app.stage.addChild(bulletsCounter);

  const timerText = new Text({
    text: `Time: ${timeLeft}`,
    style: {
      fill: '#1a3892ff',
      stroke: '#ffffff',
      strokeThickness: 2,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Courier New',
    },
  });
  timerText.x = app.screen.width - timerText.width - 20;
  timerText.y = 20;
  app.stage.addChild(timerText);

  const startTime = performance.now();

  function getRemainingTime() {
    return Math.max(
      0,
      Math.ceil(timeLeft - (performance.now() - startTime) / 1000)
    );
  }

  function updateBullets(shotsFired) {
    bulletsCounter.text = `Bullets: ${maxBullets - shotsFired} / ${maxBullets}`;
  }

  return { bulletsCounter, timerText, getRemainingTime, updateBullets };
}
