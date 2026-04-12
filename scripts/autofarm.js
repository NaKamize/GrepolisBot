"use strict";

import { Utils } from "./utils.js";
import { SELECTORS } from "./selectors.js";

export class AutoFarm {
  constructor() {
    this.utils = new Utils();
    this.running = false;
    this.seconds = 0;
  }

  async selectVillages() {
    const linkElement = document.querySelector(
      SELECTORS.farm.overviewLink
    );

    if (!linkElement) {
      throw new Error("Unable to open farm town overview.");
    }

    function triggerClickEvent(target) {
      const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      target.dispatchEvent(clickEvent);
    }

    triggerClickEvent(linkElement);
    await this.utils.timeout(200 + this.utils.generateDelay());
  }

  async selectAll() {
    this.utils.waitForElementToAppear(
      SELECTORS.farm.selectAll,
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(947 + this.utils.generateDelay());
  }

  async checkTime(seconds) {
    if (
      seconds === 300 ||
      seconds === 1200 ||
      seconds === 5400 ||
      seconds === 14400
    ) {
        this.utils.waitForElementToAppear(
        "#time_options_wrapper > div.time_options_default > div.fto_time_checkbox.fto_" +
          seconds +
          "> a",
        (element) => {
          element.click();
        }
      );
    } else {
        this.utils.waitForElementToAppear(
        "#time_options_wrapper > div.time_options_loyalty > div.fto_time_checkbox.fto_" +
          seconds +
          " > a",
        (element) => {
          element.click();
        }
      );
    }
    await this.utils.timeout(1550 + this.utils.generateDelay());
  }

  async collect() {
    this.utils.waitForElementToAppear(
      SELECTORS.farm.claimButton,
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(1480 + this.utils.generateDelay());
  }

  async confirm() {
    this.utils.waitForElementToAppear(
      SELECTORS.farm.confirmButton,
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(1188 + this.utils.generateDelay());
  }

  async close() {
    this.utils.waitForElementToAppear(
      SELECTORS.dialogs.closeButton,
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(1205 + this.utils.generateDelay());
  }

  async repeatFarm() {
    console.log("Starting AutoFarm cycle...");
    await this.selectVillages();
    await this.selectAll();
    await this.checkTime(this.seconds);
    await this.collect();
    await this.confirm();
    await this.close();
    console.log("Collecting is finished");
  }

  async start(time) {
    if (this.running) {
      console.warn("AutoFarm is already running.");
      return;
    }

    const seconds = this.utils.convertToSeconds(time);

    if (!seconds || seconds < 1) {
      throw new Error("Invalid farming interval.");
    }

    this.seconds = seconds;
    this.running = true;

    while (this.running) {
      try {
        await this.repeatFarm();
      } catch (error) {
        console.error("AutoFarm cycle failed:", error);
      }

      const delay =
        this.seconds * 1000 + Math.floor(Math.random() * (30000 - 5000) + 5000);

      console.log(`Next farm run in ${Math.round(delay / 1000)} seconds`);
      await this.utils.waitFor(delay, () => this.running);

      if (this.running) {
        console.log("AutoFarm wait finished, starting next cycle.");
      }
    }
  }

  stop() {
    this.running = false;
  }
}
