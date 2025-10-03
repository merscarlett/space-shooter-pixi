# 🚀 Space Shooter (PIXI.js)

A shooter game where the player controls a spaceship and destroys asteroids and a boss.
Built with HTML + JavaScript (ES Modules) + PIXI.js.

## 🎮 Features
- Spaceship moves only horizontally (← →).
- Shooting with the spacebar.
- Bullets are created using Graphics.
- Destroy asteroids and the boss via collisions.
- Limit: 10 shots per level.
- Timer: 60 seconds per level.
- 2 levels:
  - **Level 1**: Asteroids (random placement).
  - **Level 2**: Boss (5 HP, health bar, shoots every 2 seconds).
- End-of-game messages: YOU WIN / YOU LOSE.
- Game resolution: 1280 × 720 pixels.

## 📂 Project Structure
```
project-root/
├─ index.html          # Main page (entry point)
├─ src/
│  ├─ main.js          # JS entry point
│  ├─ game/
│  │  ├─ background.js
│  │  ├─ menu.js
│  │  ├─ hud.js
│  │  ├─ controls.js
│  │  ├─ collision.js
│  │  ├─ intro.js
│  │  ├─ player.js
│  │  ├─ bullet.js
│  │  ├─ asteroid.js
│  │  ├─ explosion.js
│  │  └─ boss.js
│  └─ levels/
│     ├─ asteroidLevel.js
│     └─ bossLevel.js
├─ assets/              # Graphics and other resources
│  └─ style.css         # Styles
├─ package.json
├─ package-lock.json
└─ vite.config.js

```
## How to Run

1. git clone https://github.com/merscarlett/space-shooter-pixi.git
2. cd space-shooter-pixi
3. npm install
4. npm run dev

## Game Screenshots

### Main Menu
![Main Menu](https://github.com/user-attachments/assets/88ddc783-d339-4e4c-af3e-9b0e9226c756)

### Asteroid Level
![Asteroid Level](https://github.com/user-attachments/assets/745a6e50-ce5f-4fe3-bd10-5293a5994503)

### Boss Fight
![Boss Fight](https://github.com/user-attachments/assets/f15c6c15-3347-4ca4-b89d-447c975a48e2)
