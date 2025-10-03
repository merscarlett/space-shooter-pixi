import { Container, Text, Sprite, Texture } from 'pixi.js';

export function createLevelIntro(app) {
  const introContainer = new Container();
  app.stage.addChild(introContainer);

  const overlayTexture = Texture.WHITE;
  const overlay = new Sprite(overlayTexture);
  overlay.tint = 0x000000;
  overlay.alpha = 0;
  overlay.width = app.screen.width;
  overlay.height = app.screen.height;
  introContainer.addChild(overlay);

  const levelText = new Text({
    text: '',
    style: {
      fill: '#fff',
      fontSize: 60,
      fontWeight: 'bold',
      fontFamily: 'Courier New',
    },
  });
  levelText.anchor.set(0.5);
  levelText.position.set(app.screen.width / 2, app.screen.height / 2);
  levelText.alpha = 0;
  introContainer.addChild(levelText);

  introContainer.visible = false;

  let activeTicker = null;

  return function showLevelIntro(text) {
    return new Promise((resolve) => {
      if (activeTicker) {
        app.ticker.remove(activeTicker);
        overlay.alpha = 0;
        levelText.alpha = 0;
      }

      levelText.text = text;
      overlay.alpha = 0;
      levelText.alpha = 0;
      introContainer.visible = true;

      let elapsed = 0;
      const fadeInDuration = 0.7;
      const visibleDuration = 0.6;
      const fadeOutDuration = 0.3;
      let phase = 'fadeIn';

      activeTicker = () => {
        const dt = app.ticker.elapsedMS / 1000;
        elapsed += dt;

        if (phase === 'fadeIn') {
          overlay.alpha = Math.min(
            0.3,
            overlay.alpha + (dt / fadeInDuration) * 0.3
          );
          levelText.alpha = Math.min(1, levelText.alpha + dt / fadeInDuration);
          if (elapsed >= fadeInDuration) {
            elapsed = 0;
            phase = 'visible';
          }
        } else if (phase === 'visible') {
          if (elapsed >= visibleDuration) {
            elapsed = 0;
            phase = 'fadeOut';
          }
        } else if (phase === 'fadeOut') {
          overlay.alpha = Math.max(
            0,
            overlay.alpha - (dt / fadeOutDuration) * 0.3
          );
          levelText.alpha = Math.max(0, levelText.alpha - dt / fadeOutDuration);
          if (elapsed >= fadeOutDuration) {
            app.ticker.remove(activeTicker);
            activeTicker = null;
            if (introContainer.parent === app.stage) {
              app.stage.removeChild(introContainer);
            }
            resolve();
          }
        }
      };

      app.ticker.add(activeTicker);
    });
  };
}
