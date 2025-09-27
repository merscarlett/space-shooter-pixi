import { Sprite, Assets, Container } from 'pixi.js';

export async function createBoss(app) {
  const bossTexture = await Assets.load('/assets/images/boss.png');
  const sprite = new Sprite(bossTexture);
  sprite.anchor.set(0.5);
  sprite.scale.set(0.17);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2 - 110;
  app.stage.addChild(sprite);

  const hpContainer = new Container();
  app.stage.addChild(hpContainer);

  const hpTexture = await Assets.load('/assets/images/hp.png');
  const maxHP = 4;
  let currentHP = maxHP;
  const hpSprites = [];
  const spacing = 5;

  for (let i = 0; i < maxHP; i++) {
    const heart = new Sprite(hpTexture);
    heart.anchor.set(0.5);
    const heartSize = 20;
    heart.scale.set(heartSize / heart.width);
    hpContainer.addChild(heart);
    hpSprites.push(heart);
  }

  function updateHeartsPosition() {
    const totalWidth =
      hpSprites.reduce((sum, h) => sum + h.width, 0) +
      (hpSprites.length - 1) * spacing;

    let offsetX = -totalWidth / 2;
    hpSprites.forEach((heart) => {
      heart.x = offsetX + heart.width / 2;
      heart.y = 0;
      offsetX += heart.width + spacing;
    });

    hpContainer.x = sprite.x;
    hpContainer.y = sprite.y - sprite.height / 2 - 20;
  }

  updateHeartsPosition();

  const speedX = 3;
  let direction = Math.random() > 0.5 ? 1 : -1;
  let moveTimer = 0;
  let isMoving = true;

  return {
    sprite,
    hpSprites,
    getHP: () => currentHP,
    hit: () => {
      if (currentHP > 0) {
        currentHP--;
        hpSprites[currentHP].visible = false;
      }
    },
    update: () => {
      moveTimer++;
      if (moveTimer > 120) {
        isMoving = Math.random() > 0.5;
        moveTimer = 0;
      }

      if (isMoving) {
        sprite.x += speedX * direction;
        if (
          sprite.x - sprite.width / 2 <= 0 ||
          sprite.x + sprite.width / 2 >= app.screen.width
        ) {
          direction *= -1;
          sprite.x += speedX * direction;
        }
      }

      updateHeartsPosition();
    },
  };
}
