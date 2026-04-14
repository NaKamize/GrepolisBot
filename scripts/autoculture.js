"use strict";

import { Utils } from "./utils.js";
import { SELECTORS } from "./selectors.js";

export class AutoCulture {
  constructor() {
    this.utils = new Utils();
    this.running = false;
    this.intervalMinutes = 0;
  }

  randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async selectOverview() {
    this.utils.waitForElementToAppear(
      SELECTORS.culture.overviewLink,
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(658 + this.utils.generateDelay());
  }

  async confirm() {
    this.utils.waitForElementToAppear(SELECTORS.culture.startAllButton, (element) => {
      element.click();
    });
    await this.utils.timeout(1001 + this.utils.generateDelay());
  }

  async close() {
    this.utils.waitForElementToAppear(
      SELECTORS.dialogs.closeAllWindows,
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(1488 + this.utils.generateDelay());
  }

  async selectOption(opt) {
    let num = 1;
    switch (opt) {
      case "Mestský festival":
        num = 1;
        break;
      case "Olympijské hry":
        num = 2;
        break;
      case "Víťazná procesia":
        num = 3;
        break;
      case "Divadelné hry":
        num = 4;
        break;
    }

    this.utils.waitForElementToAppear(
      SELECTORS.culture.celebrationSelect,
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(1488 + this.utils.generateDelay());

    this.utils.waitForElementToAppear(
      "#place_celebration_select_list > div > div:nth-child(" + num + ")",
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(1488 + this.utils.generateDelay());
  }

  async repeatCulture(opt) {
    await this.selectOverview();
    await this.selectOption(opt);
    await this.confirm();
    await this.close();
    console.log("Culture celebration started.");
  }

  async start(opt, intervalMinutes) {
    if (this.running) {
      console.warn("AutoCulture is already running.");
      return;
    }

    const minutes = Number.parseInt(intervalMinutes, 10);

    if (!Number.isFinite(minutes) || minutes < 1) {
      throw new Error("Invalid culture interval in minutes.");
    }

    this.intervalMinutes = minutes;
    this.running = true;

    while (this.running) {
      try {
        await this.repeatCulture(opt);
      } catch (error) {
        console.error("AutoCulture cycle failed:", error);
      }

      const baseDelay = this.intervalMinutes * 60 * 1000;
      const extraSeconds = this.randomBetween(60, 90);
      const delay = baseDelay + extraSeconds * 1000;

      console.log(
        `Next culture run in ${Math.round(delay / 1000)} seconds (${extraSeconds}s extra)`
      );
      await this.utils.waitFor(delay, () => this.running);
    }
  }

  stop() {
    this.running = false;
  }
}
