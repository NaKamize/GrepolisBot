"use strict";

export class Utils {
  timeout(delay) {
    return new Promise((r) => setTimeout(r, delay));
  }

  generateDelay() {
    return Math.floor(Math.random() * (4310 - 2000) + 1000);
  }

  convertToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    return totalSeconds;
  }

  waitForElementToAppear(selector, callback, interval = 100, maxAttempts = 10) {
    return new Promise((resolve) => {
      let attempts = 0;
      const timer = setInterval(() => {
        attempts++;
        const element = document.querySelector(selector);
        if (element || attempts >= maxAttempts) {
          clearInterval(timer);
          if (element) {
            if (callback) callback(element);
            resolve(element);
          } else {
            console.warn(`Element not found: ${selector}`);
            resolve(null);
          }
        }
      }, interval);
    });
  }

  async clickWhenAvailable(selector, interval = 100, maxAttempts = 20) {
    const element = await this.waitForElementToAppear(
      selector,
      null,
      interval,
      maxAttempts
    );

    if (!element) {
      return false;
    }

    element.click();
    return true;
  }

  async waitFor(ms, shouldContinue) {
    const endTime = Date.now() + ms;

    while (Date.now() < endTime) {
      if (typeof shouldContinue === "function" && !shouldContinue()) {
        return;
      }

      const remaining = endTime - Date.now();
      await this.timeout(Math.min(1000, Math.max(remaining, 0)));
    }
  }
}
