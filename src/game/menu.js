import { Text, Graphics } from 'pixi.js';

export function showMenu(app, message, buttonText, onStart) {
  const ui = [];

  const title = new Text({
    text: message,
    style: {
      fill: '#ffffff',
      fontSize: 60,
      fontWeight: 'bold',
      fontFamily: 'Courier New',
      stroke: '#1a3892ff',
      strokeThickness: 5,
    },
  });
  title.anchor.set(0.5);
  title.x = app.screen.width / 2;
  title.y = app.screen.height / 2 - 80;
  app.stage.addChild(title);
  ui.push(title);

  const button = new Graphics().roundRect(0, 0, 250, 60, 10).fill(0x1a3892);
  button.x = app.screen.width / 2 - 125;
  button.y = app.screen.height / 2;
  button.interactive = true;
  button.buttonMode = true;
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
  btnLabel.x = button.x + 125;
  btnLabel.y = button.y + 30;
  app.stage.addChild(btnLabel);
  ui.push(btnLabel);

  button.on('pointerdown', () => {
    ui.forEach((el) => app.stage.removeChild(el));
    onStart();
  });
}
