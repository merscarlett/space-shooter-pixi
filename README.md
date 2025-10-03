# 🚀 Space Shooter (PIXI.js)

Гра-шутер, де гравець керує космічним кораблем і знищує астероїди та босса.  
Реалізовано з використанням **HTML + JavaScript (ES Modules) + PIXI.js**.

## 🎮 Функціонал
- Корабель рухається лише по горизонталі (← →).
- Стрільба пробілом.
- Кулі створюються через `Graphics`.
- Знищення астероїдів і босса через колізії.
- Ліміт: **10 пострілів на рівень**.
- Таймер: **60 секунд** на рівень.
- 2 рівні:
  - **Level 1**: астероїди (рандомна розстановка).
  - **Level 2**: бос (4 HP, шкала життя, стріляє кожні 2 секунди).
- Повідомлення `YOU WIN` / `YOU LOSE` в кінці гри.

## 📂 Структура проєкту
```
project-root/
├─ index.html          # Основна сторінка (точка входу)
├─ src/
│  ├─ main.js          # Точка входу JS
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
├─ assets/             # Графіка та інші ресурси
│  └─ style.css         # Стилі
├─ package.json
├─ package-lock.json
└─ vite.config.js

```
## Як запустити проєкт

1. git clone https://github.com/merscarlett/space-shooter-pixi.git
2. cd space-shooter-pixi
3. npm install
4. npm run dev

## Скріншоти з гри

### Головне меню
![Головне меню](https://github.com/user-attachments/assets/88ddc783-d339-4e4c-af3e-9b0e9226c756)

### Рівень з астероїдами
![Рівень 1](https://github.com/user-attachments/assets/fa4cbcdc-4137-44c7-bf1d-b9b14cc641a3)

### Рівень з босом
![Бос битва](https://github.com/user-attachments/assets/f15c6c15-3347-4ca4-b89d-447c975a48e2)
