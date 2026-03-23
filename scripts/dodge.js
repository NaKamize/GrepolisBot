class AttackDodger {
  constructor() {
    this.utils = new Utils();
    this.attackCount = 0;
  }

  async getListOfAttacks() {
    this.utils.waitForElementToAppear(
      "#toolbar_activity_commands",
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(3877 + this.utils.generateDelay());
    await this.getIncomingAttacks();
  }

  async parseTimeAndTown(attackInfo) {
    let dodgeFromTown = attackInfo.children[1].children[3].innerHTML;
    console.log(dodgeFromTown);
    let dodgeIn = attackInfo.children[7].innerHTML;
    console.log(dodgeIn);
    const [hours, minutes, seconds] = dodgeIn.split(":").map(Number);

    // Calculate the total seconds
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    console.log(totalSeconds);

    setTimeout(async () => {
      await this.makeDodge(dodgeFromTown);
    }, (totalSeconds*1000) - 40000);
  }

  async villagerDef() {
    // click on town overview
    this.utils.waitForElementToAppear(
      "#ui_box > div.topleft_navigation_area > div.bull_eye_buttons > div.rb_map > div.option.city_overview.circle_button.js-option",
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(300 + this.utils.generateDelay());

    // select farm
    this.utils.waitForElementToAppear("#building_main_area_farm", (element) => {
      element.click();
    });
    await this.utils.timeout(300 + this.utils.generateDelay());

    // select barracks
    this.utils.waitForElementToAppear(
      "#request_militia_button > span.left > span > span",
      (element) => {
        element.click();
      }
    );

    await this.utils.timeout(300 + this.utils.generateDelay());

    // select barracks
    this.utils.waitForElementToAppear(
      "div > div.window_content.js-window-content > div > div.buttons > div.btn_confirm.button_new",
      (element) => {
        element.click();
      }
    );
  }

  async sendAllUnits() {
    // send all ships
    this.utils.waitForElementToAppear(
      "div > form > div.town_units_wrapper > div > div.unit_wrapper > div.naval_units.clearfix > div",
      (element) => {
        const divElements = document.querySelectorAll(
          "div > form > div.town_units_wrapper > div > div.unit_wrapper > div.naval_units.clearfix > div"
        );
        for (const divElement of divElements) {
          divElement.childNodes[1].click();
        }
      }
    );

    await this.utils.timeout(1488 + this.utils.generateDelay());
    // send all ships
    this.utils.waitForElementToAppear(
      "div > form > div.button_wrapper > a > span.left > span > span",
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(1488 + this.utils.generateDelay());

    // send all troops
    this.utils.waitForElementToAppear(
      "div > form > div.town_units_wrapper > div > div.unit_wrapper > div.ground_units.clearfix > div",
      (element) => {
        const divElements = document.querySelectorAll(
          "div > form > div.town_units_wrapper > div > div.unit_wrapper > div.ground_units.clearfix > div"
        );
        for (const divElement of divElements) {
          divElement.childNodes[1].click();
        }
      }
    );
    await this.utils.timeout(1488 + this.utils.generateDelay());

    // send all troops
    this.utils.waitForElementToAppear(
      "div > form > div.button_wrapper > a > span.left > span > span",
      (element) => {
        element.click();
      }
    );
    await this.utils.timeout(10000 + this.utils.generateDelay());
  }

  async closeAll() {
    const closeButtons = document.querySelectorAll(
      "body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.js-window-main-container > div.ui-dialog-titlebar.ui-corner-all.ui-widget-header.ui-helper-clearfix.ui-draggable-handle > button"
    );

    for (const button of closeButtons) {
      button.click();
    }

    await this.utils.timeout(200 + this.utils.generateDelay());

    const closeButtonsNext = document.querySelectorAll(
      "body > div > div.ui-dialog-titlebar.ui-corner-all.ui-widget-header.ui-helper-clearfix.ui-draggable-handle > button"
    );

    for (const button of closeButtonsNext) {
      button.click();
    }
  }

  simulateHover(element) {
    const hoverEvent = new MouseEvent("mouseover", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    element.dispatchEvent(hoverEvent);
  }

  async cancelSendingUnits() {
    console.log("canceling");

    const elementToHover = document.querySelector(
      "#ui_box > div.tb_activities.toolbar_activities > div.middle > div:nth-child(5) > div.activity.commands > div.hover_state"
    );

    this.simulateHover(elementToHover);

    const divElements = document.querySelectorAll(
      "div > div.button_new.square.remove.js-delete.cancelable"
    );
    for (const divElement of divElements) {
      divElement.click();
    }

    await this.utils.timeout(888 + this.utils.generateDelay());
  }

  async makeDodge(dodgeFromTown) {
    console.log("Hello i was called after 10 seconds");
    const dodgeTo = localStorage.getItem(dodgeFromTown);
    if (!dodgeTo) {
      console.warn(`No dodge target configured for town: ${dodgeFromTown}`);
      return;
    }
    let dodgeObj = JSON.parse(dodgeTo);

    await this.utils.timeout(1488 + this.utils.generateDelay());

    // select town to dodge from
    this.utils.waitForElementToAppear(
      "#ui_box > div.town_name_area > div.town_groups_dropdown.btn_toggle_town_groups_menu > div.caption.js-viewport",
      (element) => {
        element.click();
      }
    );

    await this.utils.timeout(1488 + this.utils.generateDelay());

    const findDivByInnerText = (innerTextToFind, selector) => {
      const divElements = document.querySelectorAll(selector);

      for (const divElement of divElements) {
        if (divElement.innerText === innerTextToFind) {
          return divElement;
        }
      }

      return null;
    };

    await this.utils.timeout(1488 + this.utils.generateDelay());
    // click town name
    this.utils.waitForElementToAppear(
      "#town_groups_list > div.content.js-dropdown-item-list.town_groups_list > div.town_group.town_group_-1.selected > div.group_towns.ui-droppable > div > span",
      () => {
        const foundDiv = findDivByInnerText(
          dodgeFromTown,
          "#town_groups_list > div.content.js-dropdown-item-list.town_groups_list > div.town_group.town_group_-1.selected > div.group_towns.ui-droppable > div > span"
        );
        console.log(foundDiv);
        foundDiv.click();
      }
    );

    await this.villagerDef();

    await this.utils.timeout(200 + this.utils.generateDelay());

    // click raned

    this.utils.waitForElementToAppear(
      "#ui_box > div.nui_main_menu > div.middle > div.content > ul > li.ranking.main_menu_item",
      (element) => {
        element.click();
      }
    );

    await this.utils.timeout(1488 + this.utils.generateDelay());

    this.utils.waitForElementToAppear("#player_name", (element) => {
      console.log(dodgeObj);
      element.value = dodgeObj.pname;
    });

    await this.utils.timeout(1488 + this.utils.generateDelay());

    this.utils.waitForElementToAppear(
      "#ranking_search > a.button > span.left > span > span",
      (element) => {
        element.click();
      }
    );

    await this.utils.timeout(1488 + this.utils.generateDelay());

    this.utils.waitForElementToAppear(
      "#ranking_inner > tr.game_table_even.bottom > td.r_name > a",
      (element) => {
        element.click();
      }
    );

    await this.utils.timeout(1488 + this.utils.generateDelay());

    this.utils.waitForElementToAppear(
      "#player_towns > div > ul > li > a",
      () => {
        const elements = document.querySelectorAll(
          "#player_towns > div > ul > li > a"
        );
        console.log(elements);
        for (const element of elements) {
          console.log(element.innerText);
          if (element.innerText === dodgeObj.tname) {
            element.click();
          }
        }
      }
    );

    await this.utils.timeout(1488 + this.utils.generateDelay());

    this.utils.waitForElementToAppear("#support", (element) => {
      element.click();
    });

    await this.utils.timeout(1488 + this.utils.generateDelay());

    await this.sendAllUnits();
    await this.cancelSendingUnits();
    await this.closeAll();
  }

  filterAttacks(doc) {
    const rootElement = doc.documentElement;

    for (let i = 0; i < rootElement.children.length; i++) {
      const childElement = rootElement.children[i];

      if (childElement.tagName === "BODY") {
        for (let j = 0; j < childElement.children.length; j++) {
          const childElementList = childElement.children[j];
          let type = childElementList.attributes[2].value;
          if (type === "attack_land" || type === "attack_sea") {
            console.log(childElementList);
            console.log(
              childElementList.children[0].children[1].children[2].attributes[0]
                .value
            );
            if (
              childElementList.children[0].children[1].children[2].attributes[0]
                .value === "overview_outgoing icon"
            ) {
              this.parseTimeAndTown(childElementList.children[0]);
            }
          }
        }
      }
    }
  }

  async getIncomingAttacks() {
    this.utils.waitForElementToAppear("#command_overview", (element) => {
      element.click();
    });
    //await this.utils.timeout(3877 + this.utils.generateDelay());
    let content = document.querySelector("#command_overview");
    console.log(content.innerHTML);
    let myDoc = new DOMParser().parseFromString(content.innerHTML, "text/html");
    console.log(myDoc);
    this.filterAttacks(myDoc);

    const now = new Date();
    const day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log(day + ":" + hours + ":" + minutes + ":" + seconds);
  }

  run() {
    const attackCount = document.querySelector(
      "#ui_box > div.tb_activities.toolbar_activities > div.middle > div:nth-child(1) > div.activity.attack_indicator > div.hover_state > div > div"
    );

    if (attackCount.innerText !== "") {
      this.attackCount = parseInt(attackCount.innerText);
      console.log("Attack count: " + this.attackCount);
    }

    const mutationObserver = new MutationObserver((mutations) => {
      setTimeout(() => {
        if (mutations[2].type === "childList") {
          if (
            parseInt(
              mutations[2].addedNodes[1].childNodes[1].firstElementChild
                .innerText
            ) > this.attackCount
          ) {
            this.attackCount++;
            console.log("Attack detected");
            this.getListOfAttacks();
          } else if (
            parseInt(
              mutations[2].addedNodes[1].childNodes[1].firstElementChild
                .innerText
            ) < this.attackCount
          ) {
            this.attackCount--;
            console.log("Attack canceled");
          } else {
            this.attackCount = 0;
            console.log("No Attacks");
          }
        }
      }, 5000);
    });

    const activity = document.querySelector(
      "#ui_box > div.tb_activities.toolbar_activities > div.middle > div:nth-child(1) > div.activity.attack_indicator"
    );

    mutationObserver.observe(activity, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  }
}
