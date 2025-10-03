import { Sprite, Assets, Container } from 'pixi.js';

let cachedBossTexture = null;
let cachedHpTexture = null;

export async function createBoss(app) {
  if (!cachedBossTexture) {
    cachedBossTexture = await Assets.load('/assets/images/boss.png');
  }
  if (!cachedHpTexture) {
    cachedHpTexture = await Assets.load('/assets/images/hp.png');
  }
  const bossTexture = cachedBossTexture;
  const hpTexture = cachedHpTexture;

  const sprite = new Sprite(bossTexture);
  sprite.anchor.set(0.5);
  sprite.scale.set(0.17);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2 - 100;
  app.stage.addChild(sprite);

  const hpContainer = new Container();
  app.stage.addChild(hpContainer);

  const maxHP = 5;
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

  function update() {
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
      sprite.y += Math.sin(app.ticker.lastTime / 500) * 0.5;
    }
    updateHeartsPosition();
  }

  function hit() {
    if (currentHP > 0) {
      currentHP--;
      hpSprites[currentHP].visible = false;
    }
  }

  function update() {
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
      sprite.y += Math.sin(app.ticker.lastTime / 500) * 0.5;
    }
    updateHeartsPosition();
  }

  return {
    sprite,
    hpSprites,
    getHP: () => currentHP,
    hit,
    update,
  };
}
