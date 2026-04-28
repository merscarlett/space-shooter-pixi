import { Text, Graphics } from 'pixi.js';

const BUTTON_WIDTH = 270;
const BUTTON_HEIGHT = 62;

function drawButton(button, isHover = false) {
  button
    .clear()
    .roundRect(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT, 8)
    .fill(isHover ? 0x2a65d6 : 0x1b48a8)
    .stroke({ width: 3, color: isHover ? 0x8be7ff : 0x4fb8ff });
}

export function showMenu(app, message, buttonText, onStart) {
  const ui = [];

  const overlay = new Graphics()
    .rect(0, 0, app.screen.width, app.screen.height)
    .fill({ color: 0x000000, alpha: 0.28 });
  app.stage.addChild(overlay);
  ui.push(overlay);

  const panel = new Graphics()
    .roundRect(0, 0, 560, 250, 8)
    .fill({ color: 0x061124, alpha: 0.68 })
    .stroke({ width: 2, color: 0x5ed6ff, alpha: 0.55 });
  panel.x = app.screen.width / 2 - 280;
  panel.y = app.screen.height / 2 - 150;
  app.stage.addChild(panel);
  ui.push(panel);

  const title = new Text({
    text: message,
    style: {
      fill: '#ffffff',
      fontSize: 60,
      fontWeight: 'bold',
      fontFamily: 'Courier New',
      stroke: '#07132b',
      strokeThickness: 7,
    },
  });
  title.anchor.set(0.5);
  title.x = app.screen.width / 2;
  title.y = app.screen.height / 2 - 76;
  app.stage.addChild(title);
  ui.push(title);

  const button = new Graphics();
  drawButton(button);
  button.x = app.screen.width / 2 - BUTTON_WIDTH / 2;
  button.y = app.screen.height / 2 + 18;
  button.eventMode = 'static';
  button.cursor = 'pointer';
  app.stage.addChild(button);
  ui.push(button);

  const btnLabel = new Text({
    text: buttonText,
    style: {
      fill: '#ffffff',
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'Courier New',
    },
  });
  btnLabel.anchor.set(0.5);
  btnLabel.x = button.x + BUTTON_WIDTH / 2;
  btnLabel.y = button.y + BUTTON_HEIGHT / 2;
  app.stage.addChild(btnLabel);
  ui.push(btnLabel);

  button.on('pointerover', () => drawButton(button, true));
  button.on('pointerout', () => drawButton(button));
  button.on('pointerdown', () => {
    ui.forEach((el) => {
      if (el.parent === app.stage) {
        app.stage.removeChild(el);
      }
    });
    onStart();
  });
}
