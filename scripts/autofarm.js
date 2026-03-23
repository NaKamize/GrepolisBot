"use strict";

class AutoFarm {
  constructor() {
    this.utils = new Utils();
  }

  async selectVillages() {
    const linkElement = document.querySelector(
      "#overviews_link_hover_menu > div.box.middle.left > div > div > ul > li.subsection.captain.enabled > ul > li.farm_town_overview > a"
    );

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
      "#fto_town_wrapper > div > div.game_header.bold > span.checkbox_wrapper > a",
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(1547 + this.utils.generateDelay());
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
      "#fto_claim_button > div.caption.js-caption",
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(2200);
  }

  async confirm() {
    this.utils.waitForElementToAppear(
      ".window_content.js-window-content > div > div.buttons > div.btn_confirm.button_new > div.caption.js-caption",
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(2188 + this.utils.generateDelay());
  }

  async close() {
    this.utils.waitForElementToAppear(
      "body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.js-window-main-container > div.ui-dialog-titlebar.ui-corner-all.ui-widget-header.ui-helper-clearfix.ui-draggable-handle > button",
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(1205 + this.utils.generateDelay());
  }

  async repeatFarm() {
    await this.selectVillages();
    await this.selectAll();
    await this.checkTime(this.seconds);
    await this.collect();
    await this.confirm();
    await this.close();
    console.log("Collecting is finished");
  }

  async run(time) {
    console.log(time);
    const seconds = this.utils.convertToSeconds(time);
    console.log(seconds);
    this.seconds = seconds;

    while (true) {
      await this.repeatFarm();

      let delay =
        this.seconds * 1000 + Math.floor(Math.random() * (30000 - 5000) + 5000);
      console.log(delay);
      await this.utils.timeout(delay);
    }
  }
}
