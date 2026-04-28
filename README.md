# GrepolisBot

[![Greasy Fork](https://img.shields.io/badge/Greasy%20Fork-67%20installs-brightgreen?logo=tampermonkey)](https://greasyfork.org/en/scripts/468760-grepolisbot)
[![GitHub](https://img.shields.io/badge/GitHub-NaKamize%2FGrepolisBot-blue?logo=github)](https://github.com/NaKamize/GrepolisBot)

A [Tampermonkey](https://www.tampermonkey.net/) userscript for [Grepolis](https://www.grepolis.com/) that automates repetitive tasks so you can spend more time on strategy and less on clicking.

> **67 installs on GreasyFork and growing.** Thank you for using GrepolisBot.

---

## What It Automates

| Module | What it does | Notes |
|---|---|---|
| **AutoFarm** | Collects farm-town resources in cycles | Uses selectable intervals from 5 minutes up to 8 hours and adds a random extra delay between runs |
| **AutoCulture** | Starts culture celebrations repeatedly | Supports Town Festival, Olympic Games, Triumph Procession, and Theatre Plays with custom interval in minutes |
| **AutoSilverVault** | Manages cave silver in bulk | Sets keep/store values for all towns and reruns every X minutes with random jitter |
| **AttackDodger** | Watches for incoming attacks and schedules dodge actions | Plans support movement to configured safe targets about 40 seconds before impact |

The panel is draggable and split into tabs:

- **Automation** tab: Farm, Culture, Silver Vault
- **Dodge** tab: AttackDodger setup and controls

## UI Preview

![GrepolisBot UI preview](docs/images/ui-preview.png)

---

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. Open the [GreasyFork script page](https://greasyfork.org/en/scripts/468760-grepolisbot).
3. Click **Install this script**.
4. Open Grepolis and wait for the page to load. The GrepolisBot panel appears automatically.

---

## Usage

### AutoFarm

1. In the **Automation** tab, choose a farm interval in `HH:MM:SS` format.
2. Click **Start**.
3. Click **Stop** anytime to end the loop.

### AutoCulture

1. Choose celebration type.
2. Enter repeat interval in minutes.
3. Click **Start**.

### AutoSilverVault

1. Enter how much silver to keep in towns.
2. Enter how much silver to store in cave/hide.
3. Enter repeat interval in minutes.
4. Click **Start**.

### AttackDodger

1. Switch to the town you want to dodge from.
2. Enter target **Player Name** and **Town Name**.
3. Click **Submit** to save this route for the current town.
4. Click **Start** to begin monitoring attacks.
5. Repeat route setup for additional towns as needed.

Saved routes are displayed directly in the Dodge section and stored in browser local storage.

---

## Technical Notes

- Built with ES modules and bundled with esbuild.
- Uses randomized delays to reduce predictable action timing.
- All automations support explicit start/stop behavior.
- AttackDodger clears pending timeouts and observers when stopped.

---

## Development

### Requirements

- Node.js 20+

### Commands

```bash
npm install
npm run build
npm run build:watch
npm run lint
npm run lint:fix
npm run format
```

The built userscript output is written to `script`.

### Deploy helper

`deploy.sh` installs dependencies and runs the build.

---

## Links

- [GreasyFork](https://greasyfork.org/en/scripts/468760-grepolisbot)
- [GitHub repository](https://github.com/NaKamize/GrepolisBot)
