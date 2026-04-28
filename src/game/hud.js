import { Text, Container, Graphics } from 'pixi.js';

const PANEL_HEIGHT = 46;
const PANEL_PADDING_X = 16;
const PANEL_Y = 18;
const BULLETS_PANEL_MIN_WIDTH = 172;
const TIMER_PANEL_MIN_WIDTH = 118;

function drawPanel(graphics, width) {
  graphics
    .clear()
    .roundRect(0, 0, width, PANEL_HEIGHT, 8)
    .fill({ color: 0x061124, alpha: 0.72 })
    .stroke({ width: 2, color: 0x5ed6ff, alpha: 0.55 });
}

export function createHUD(app, maxBullets, timeLeft) {
  const hudContainer = new Container();
  app.stage.addChild(hudContainer);

  const textStyle = {
    fill: '#f7fbff',
    stroke: '#08152f',
    strokeThickness: 4,
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'Courier New',
  };

  const bulletsGroup = new Container();
  bulletsGroup.x = 20;
  bulletsGroup.y = PANEL_Y;
  hudContainer.addChild(bulletsGroup);

  const bulletsPanel = new Graphics();
  bulletsGroup.addChild(bulletsPanel);

  const bulletsCounter = new Text({
    text: `Bullets: ${maxBullets} / ${maxBullets}`,
    style: textStyle,
  });
  bulletsCounter.x = PANEL_PADDING_X;
  bulletsCounter.y = 11;
  bulletsGroup.addChild(bulletsCounter);

  const timerGroup = new Container();
  timerGroup.y = PANEL_Y;
  hudContainer.addChild(timerGroup);

  const timerPanel = new Graphics();
  timerGroup.addChild(timerPanel);

  const timerText = new Text({
    text: `Time: ${timeLeft}`,
    style: textStyle,
  });
  timerText.x = PANEL_PADDING_X;
  timerText.y = 11;
  timerGroup.addChild(timerText);

  const startTime = performance.now();

  function layoutCounter(group, panel, text, minWidth, alignRight = false) {
    const width = Math.max(minWidth, text.width + PANEL_PADDING_X * 2);
    drawPanel(panel, width);

    if (alignRight) {
      group.x = app.screen.width - width - 20;
    }
  }

  layoutCounter(
    bulletsGroup,
    bulletsPanel,
    bulletsCounter,
    BULLETS_PANEL_MIN_WIDTH
  );
  layoutCounter(timerGroup, timerPanel, timerText, TIMER_PANEL_MIN_WIDTH, true);

  function getRemainingTime() {
    return Math.max(
      0,
      Math.ceil(timeLeft - (performance.now() - startTime) / 1000)
    );
  }

  function updateBullets(shotsFired) {
    bulletsCounter.text = `Bullets: ${maxBullets - shotsFired} / ${maxBullets}`;
    layoutCounter(
      bulletsGroup,
      bulletsPanel,
      bulletsCounter,
      BULLETS_PANEL_MIN_WIDTH
    );
  }

  function updateTimer(remainingTime) {
    timerText.text = `Time: ${remainingTime}`;
    layoutCounter(
      timerGroup,
      timerPanel,
      timerText,
      TIMER_PANEL_MIN_WIDTH,
      true
    );
  }

  function removeHUD() {
    if (hudContainer.parent === app.stage) {
      app.stage.removeChild(hudContainer);
    }
  }

  return {
    bulletsCounter,
    timerText,
    getRemainingTime,
    updateBullets,
    updateTimer,
    hudContainer,
    removeHUD,
  };
}
