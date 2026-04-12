# GrepolisBot

[![Greasy Fork](https://img.shields.io/badge/Greasy%20Fork-61%20installs-brightgreen?logo=tampermonkey)](https://greasyfork.org/en/scripts/468760-grepolisbot)
[![GitHub](https://img.shields.io/badge/GitHub-NaKamize%2FGrepolisBot-blue?logo=github)](https://github.com/NaKamize/GrepolisBot)

A [Tampermonkey](https://www.tampermonkey.net/) userscript bot for [Grepolis](https://www.grepolis.com/) that automates repetitive in-game tasks — farm collection, culture events, and attack dodging — so you can focus on strategy.

> **61 installs on GreasyFork and growing!** Thank you to everyone who uses GrepolisBot.

---

## Features

| Feature | Description |
|---|---|
| **AutoFarm** | Automatically collects resources from all farm towns at a configurable interval (5 min – 8 hours) |
| **AutoCulture** | Starts culture celebrations (Town Festival, Olympic Games, Triumph Procession, Theatre Plays) on a schedule |
| **AttackDodger** | Detects incoming attacks and automatically sends your troops to a safe town ~40 seconds before impact |

The control panel is **draggable** — place it wherever you like on the screen.

## UI Preview

![GrepolisBot UI preview](docs/images/ui-preview.png)

---

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser (Chrome, Firefox, Edge, etc.).
2. Go to the **[GreasyFork page](https://greasyfork.org/en/scripts/468760-grepolisbot)** and click **Install this script**.
3. Open [Grepolis](https://www.grepolis.com/) — the bot panel will appear automatically inside the game.

## Development

This project now uses a modern JavaScript workflow:

- **esbuild** for bundling
- **ES modules** for code organization
- **ESLint** for static analysis
- **Prettier** for formatting

### Local setup

1. Install Node.js 20+.
2. Install dependencies:

	```bash
	npm install
	```

3. Build userscript output:

	```bash
	npm run build
	```

4. Lint the code:

	```bash
	npm run lint
	```

5. Format code:

	```bash
	npm run format
	```

The generated userscript is written to the `script` file.

### Deploy script

`deploy.sh` now installs dependencies and runs the build pipeline instead of manual file concatenation.

---

## Usage

### AutoFarm
1. Select the farming interval from the dropdown (e.g. `01:30:00` for every 1.5 hours).
2. Click **Start** — the bot will automatically collect from all farm towns and repeat at that interval.

### AutoCulture
1. Select the **celebration type** from the first dropdown.
2. Select the **timing** from the second dropdown.
3. Click **Start** — the bot will queue the celebration.

### AttackDodger
1. Switch to the town you want to dodge **from** using the in-game town arrows.
2. Enter the **Player Name** and **Town Name** of the safe destination, then click **Submit** (saved per town to `localStorage`).
3. Click **Start** — the bot monitors all incoming attacks and automatically moves your troops before each attack lands.

---

## How It Works

- All actions use randomised delays to mimic human behaviour.
- The dodger schedules troop movement 40 seconds before the calculated impact time.
- Dodge targets are persisted in `localStorage`, so they survive page refreshes.
- Farm, culture, and dodge features now use explicit start/stop lifecycles to avoid duplicate loops.

---

## Links

- [GreasyFork](https://greasyfork.org/en/scripts/468760-grepolisbot) — install & rate the script
- [GitHub](https://github.com/NaKamize/GrepolisBot) — source code & issues
