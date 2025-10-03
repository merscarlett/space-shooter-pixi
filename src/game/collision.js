function isColliding(spriteA, spriteB) {
  const dx = spriteA.x - spriteB.x;
  const dy = spriteA.y - spriteB.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const radiusA = spriteA.width / 2;
  const radiusB = spriteB.width / 2;
  const collisionFactor = spriteB.isBoss ? 1 : 0.6;
  return distance < (radiusA + radiusB) * collisionFactor;
}

function pointInTriangle(px, py, a, b, c) {
  const areaOrig = Math.abs(
    (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2
  );
  const area1 = Math.abs(
    (px * (b.y - c.y) + b.x * (c.y - py) + c.x * (py - b.y)) / 2
  );
  const area2 = Math.abs(
    (a.x * (py - c.y) + px * (c.y - a.y) + c.x * (a.y - py)) / 2
  );
  const area3 = Math.abs(
    (a.x * (b.y - py) + b.x * (py - a.y) + px * (a.y - b.y)) / 2
  );
  return Math.abs(areaOrig - (area1 + area2 + area3)) < 0.01;
}

function getTriangleVertices(sprite) {
  const halfWidth = sprite.width / 2;
  const halfHeight = sprite.height / 2;
  return [
    { x: sprite.x, y: sprite.y - halfHeight },
    { x: sprite.x - halfWidth, y: sprite.y + halfHeight },
    { x: sprite.x + halfWidth, y: sprite.y + halfHeight },
  ];
}

function isCollidingTriangle(spriteA, spriteB) {
  const vertsA = getTriangleVertices(spriteA);
  const vertsB = getTriangleVertices(spriteB);

  for (const v of vertsA) {
    if (pointInTriangle(v.x, v.y, ...vertsB)) return true;
  }
  for (const v of vertsB) {
    if (pointInTriangle(v.x, v.y, ...vertsA)) return true;
  }
  return false;
}

function updateBulletsAndCollisions(bullets, targets, onHit, app) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    const alive = b.update();
    if (!alive) {
      app.stage.removeChild(b.sprite);
      bullets.splice(i, 1);
      continue;
    }

    for (let j = targets.length - 1; j >= 0; j--) {
      const t = targets[j];
      if (isColliding(b.sprite, t.sprite)) {
        onHit(t);
        app.stage.removeChild(b.sprite);
        bullets.splice(i, 1);
        break;
      }
    }
  }
}

export { isColliding, isCollidingTriangle, updateBulletsAndCollisions };
