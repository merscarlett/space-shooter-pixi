const sceneCleanups = new WeakMap();

export function registerSceneCleanup(app, cleanup) {
  if (!sceneCleanups.has(app)) {
    sceneCleanups.set(app, []);
  }

  sceneCleanups.get(app).push(cleanup);
  return cleanup;
}

export function clearScene(app) {
  const cleanups = sceneCleanups.get(app) ?? [];

  while (cleanups.length > 0) {
    cleanups.pop()();
  }

  app.stage.removeChildren();
}
