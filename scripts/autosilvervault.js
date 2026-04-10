"use strict";

import { Utils } from "./utils.js";
import { SELECTORS } from "./selectors.js";

export class AutoSilverVault {
  constructor() {
    this.utils = new Utils();
    this.running = false;
    this.keepAmount = 0;
    this.storeAmount = 0;
    this.intervalMinutes = 0;
  }

  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async applyHumanDelay() {
    await this.utils.timeout(350 + this.utils.generateDelay());
  }

  async openOverview() {
    const link = await this.utils.waitForElementToAppear(
      SELECTORS.silverVault.overviewLink,
      null,
      100,
      20
    );

    if (!link) {
      throw new Error("Unable to open silver vault overview.");
    }

    link.click();
    await this.applyHumanDelay();
  }

  setInputValue(input, value) {
    input.focus();
    input.value = String(value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.blur();
  }

  async setKeepAmount() {
    const input = await this.utils.waitForElementToAppear(
      SELECTORS.silverVault.keepInput,
      null,
      100,
      30
    );

    if (!input) {
      throw new Error("Keep amount input not found.");
    }

    this.setInputValue(input, this.keepAmount);
    await this.applyHumanDelay();
  }

  async setStoreAmount() {
    const input = await this.utils.waitForElementToAppear(
      SELECTORS.silverVault.storeInput,
      null,
      100,
      30
    );

    if (!input) {
      throw new Error("Store amount input not found.");
    }

    this.setInputValue(input, this.storeAmount);
    await this.applyHumanDelay();
  }

  async confirmStore() {
    const ok = await this.utils.clickWhenAvailable(
      SELECTORS.silverVault.confirmButton,
      100,
      20
    );

    if (!ok) {
      throw new Error("Silver vault confirm button not found.");
    }

    await this.applyHumanDelay();
  }

  async closeAllWindows() {
    await this.utils.clickWhenAvailable(
      SELECTORS.silverVault.closeAllWindows,
      100,
      20
    );
    await this.applyHumanDelay();
  }

  async runOnce() {
    await this.openOverview();
    await this.setKeepAmount();
    await this.setStoreAmount();
    await this.confirmStore();
    await this.closeAllWindows();
  }

  async start({ keepAmount, storeAmount, intervalMinutes }) {
    if (this.running) {
      console.warn("AutoSilverVault is already running.");
      return;
    }

    const parsedKeep = Number.parseInt(keepAmount, 10);
    const parsedStore = Number.parseInt(storeAmount, 10);
    const parsedInterval = Number.parseInt(intervalMinutes, 10);

    if (!Number.isFinite(parsedKeep) || parsedKeep < 0) {
      throw new Error("Invalid keep amount.");
    }

    if (!Number.isFinite(parsedStore) || parsedStore < 0) {
      throw new Error("Invalid store amount.");
    }

    if (!Number.isFinite(parsedInterval) || parsedInterval < 1) {
      throw new Error("Invalid interval in minutes.");
    }

    this.keepAmount = parsedKeep;
    this.storeAmount = parsedStore;
    this.intervalMinutes = parsedInterval;
    this.running = true;

    while (this.running) {
      try {
        await this.runOnce();
      } catch (error) {
        console.error("AutoSilverVault cycle failed:", error);
      }

      const baseDelay = this.intervalMinutes * 60 * 1000;
      const randomSeconds = this.randomBetween(30, 300);
      const nextDelay = baseDelay + randomSeconds * 1000;

      await this.utils.waitFor(nextDelay, () => this.running);
    }
  }

  stop() {
    this.running = false;
  }
}
