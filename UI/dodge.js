"use strict";
class DodgeUI {
  constructor(mainDiv) {
    this.mainDiv = mainDiv;
    this.readOnlyInput = null;
  }

  createHeading() {
    const heading = document.createElement("h3");
    heading.textContent = "AttackDodger";
    heading.style.color = "Red";
    return heading;
  }

  createStart(text) {
    const button = document.createElement("button");
    button.textContent = text;

    button.addEventListener("click", function () {
      let ad = new AttackDodger();
      ad.run();
    });

    return button;
  }

  createSubmit(text) {
    const button = document.createElement("button");
    button.textContent = text;

    button.addEventListener("click", function () {
      const townNameSelector = document.querySelector(
        "#ui_box > div.town_name_area > div.town_groups_dropdown.btn_toggle_town_groups_menu > div.caption.js-viewport > div"
      );

      const playerNameInput = document.getElementById("playerNameInput");
      const townNameInput = document.getElementById("townNameInput");

      const playerName = playerNameInput.value;
      const townName = townNameInput.value;

      console.log(townNameSelector.textContent + " is doding to");
      console.log("Player Name:", playerName);
      console.log("Town Name:", townName);

      const dodgeObj = { pname: playerName, tname: townName };
      console.log(dodgeObj);
      const dodgeObjString = JSON.stringify(dodgeObj);
      localStorage.setItem(townNameSelector.textContent, dodgeObjString);
    });

    return button;
  }

  createAutoDodgeeDiv(name) {
    const autoDodgeDiv = document.createElement("div");
    autoDodgeDiv.className = name;
    return autoDodgeDiv;
  }

  isJsonString(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  refreshDodgeInfo() {
    const townNameSelector = document.querySelector(
      "#ui_box > div.town_name_area > div.town_groups_dropdown.btn_toggle_town_groups_menu > div.caption.js-viewport > div"
    );

    let item = localStorage.getItem(townNameSelector.textContent);
    if (item === null || !this.isJsonString(item)) {
      this.readOnlyInput.value = "";
      return;
    }
    let dodgeObj = JSON.parse(item);

    this.readOnlyInput.value = dodgeObj.tname + " : " + dodgeObj.pname;
  }

  createDodgeUI() {
    const heading = this.createHeading();

    const startDodging = this.createStart("Start");
    startDodging.style.display = "block";
    startDodging.style.justifyContent = "center";
    startDodging.style.margin = "auto";

    const submit = this.createSubmit("Submit");

    const playerNameInput = document.createElement("input");
    const townNameInput = document.createElement("input");
    this.readOnlyInput = document.createElement("input");

    // Set attributes for the input elements
    playerNameInput.type = "text";
    townNameInput.type = "text";

    this.readOnlyInput.type = "text";
    this.readOnlyInput.readOnly = true;
    this.refreshDodgeInfo();

    const arrowRight = document.querySelector(
      "#ui_box > div.town_name_area > div.btn_next_town.button_arrow.right"
    );

    const arrowLeft = document.querySelector(
      "#ui_box > div.town_name_area > div.btn_prev_town.button_arrow.left"
    );

    if (arrowRight) {
      arrowRight.addEventListener("click", () => {
        this.refreshDodgeInfo();
      });
    }

    if (arrowLeft) {
      arrowLeft.addEventListener("click", () => {
        this.refreshDodgeInfo();
      });
    }

    // Placeholder text for the inputs
    playerNameInput.placeholder = "Enter Player Name";
    townNameInput.placeholder = "Enter Town Name";
    this.readOnlyInput.placeholder = "Not set";

    this.mainDiv.appendChild(heading);

    submit.style.margin = "auto";
    submit.style.display = "block";
    submit.style.justifyContent = "center";

    playerNameInput.setAttribute("id", "playerNameInput");
    townNameInput.setAttribute("id", "townNameInput");

    // Append the inputs to the mainDiv
    this.mainDiv.appendChild(playerNameInput);
    this.mainDiv.appendChild(townNameInput);
    this.mainDiv.appendChild(submit);
    this.mainDiv.appendChild(this.readOnlyInput);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    buttonContainer.appendChild(startDodging);
    this.mainDiv.appendChild(buttonContainer);
  }
}
