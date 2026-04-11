"use strict";

export class DodgeUI {
  constructor(mainDiv, attackDodger) {
    this.mainDiv = mainDiv;
    this.readOnlyInput = null;
    this.mappingsList = null;
    this.attackDodger = attackDodger;
    this.isRunning = false;
  }

  createHeading() {
    const heading = document.createElement("h3");
    heading.textContent = "AttackDodger";
    heading.className = "gb-section-title";
    heading.style.color = "#ff8f80";
    return heading;
  }

  createStart(text) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = "gb-btn";

    button.addEventListener("click", () => {
      if (!this.isRunning) {
        this.attackDodger.run();
        this.isRunning = true;
        button.textContent = "Stop";
        return;
      }

      this.attackDodger.stop();
      this.isRunning = false;
      button.textContent = "Start";
    });

    return button;
  }

  createSubmit(text) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = "gb-btn gb-muted";

    button.addEventListener("click", () => {
      const townNameSelector = document.querySelector(
        "#ui_box > div.town_name_area > div.town_groups_dropdown.btn_toggle_town_groups_menu > div.caption.js-viewport > div"
      );

      if (!townNameSelector) {
        return;
      }

      const playerNameInput = document.getElementById("playerNameInput");
      const townNameInput = document.getElementById("townNameInput");

      if (!playerNameInput || !townNameInput) {
        return;
      }

      const playerName = playerNameInput.value;
      const townName = townNameInput.value;

      console.log(townNameSelector.textContent + " is doding to");
      console.log("Player Name:", playerName);
      console.log("Town Name:", townName);

      const dodgeObj = { pname: playerName, tname: townName };
      console.log(dodgeObj);
      const dodgeObjString = JSON.stringify(dodgeObj);
      localStorage.setItem(townNameSelector.textContent, dodgeObjString);

      this.refreshDodgeInfo();
      this.refreshMappingsList();
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
    } catch {
      return false;
    }
  }

  refreshDodgeInfo() {
    if (!this.readOnlyInput) {
      return;
    }

    const townNameSelector = document.querySelector(
      "#ui_box > div.town_name_area > div.town_groups_dropdown.btn_toggle_town_groups_menu > div.caption.js-viewport > div"
    );

    if (!townNameSelector) {
      this.readOnlyInput.value = "";
      return;
    }

    let item = localStorage.getItem(townNameSelector.textContent);
    if (item === null || !this.isJsonString(item)) {
      this.readOnlyInput.value = "";
      return;
    }
    let dodgeObj = JSON.parse(item);

    this.readOnlyInput.value = dodgeObj.tname + " : " + dodgeObj.pname;
  }

  getAllMappings() {
    const mappings = [];

    for (let i = 0; i < localStorage.length; i++) {
      const fromTown = localStorage.key(i);
      const rawValue = localStorage.getItem(fromTown);

      if (!rawValue || !this.isJsonString(rawValue)) {
        continue;
      }

      const parsed = JSON.parse(rawValue);
      if (!parsed || !parsed.tname || !parsed.pname) {
        continue;
      }

      mappings.push({
        fromTown,
        toTown: parsed.tname,
        playerName: parsed.pname,
      });
    }

    mappings.sort((a, b) => a.fromTown.localeCompare(b.fromTown));
    return mappings;
  }

  refreshMappingsList() {
    if (!this.mappingsList) {
      return;
    }

    this.mappingsList.innerHTML = "";
    const mappings = this.getAllMappings();

    if (mappings.length === 0) {
      const empty = document.createElement("li");
      empty.className = "gb-mapping-item";
      empty.textContent = "No dodge routes saved yet.";
      this.mappingsList.appendChild(empty);
      return;
    }

    for (const mapping of mappings) {
      const item = document.createElement("li");
      item.className = "gb-mapping-item";
      item.textContent =
        mapping.fromTown + " -> " + mapping.toTown + " (" + mapping.playerName + ")";
      this.mappingsList.appendChild(item);
    }
  }

  createDodgeUI() {
    const section = document.createElement("section");
    section.className = "gb-section";

    const heading = this.createHeading();
    const titleRow = document.createElement("div");
    titleRow.className = "gb-title-row";

    const infoBadge = document.createElement("span");
    infoBadge.className = "gb-info-badge";
    infoBadge.textContent = "i";

    const tooltip = document.createElement("span");
    tooltip.className = "gb-tooltip";
    tooltip.textContent =
      "Nastav cielovu trasu pre aktualne mesto. Ulozene trasy uvidis nizsie v zozname.";
    infoBadge.appendChild(tooltip);

    titleRow.appendChild(heading);
    titleRow.appendChild(infoBadge);

    const startDodging = this.createStart("Start");

    const submit = this.createSubmit("Submit");

    const playerNameInput = document.createElement("input");
    const townNameInput = document.createElement("input");
    this.readOnlyInput = document.createElement("input");

    // Set attributes for the input elements
    playerNameInput.type = "text";
    townNameInput.type = "text";
    playerNameInput.className = "gb-input";
    townNameInput.className = "gb-input";

    this.readOnlyInput.type = "text";
    this.readOnlyInput.readOnly = true;
    this.readOnlyInput.className = "gb-input gb-muted";
    this.refreshDodgeInfo();

    this.mappingsList = document.createElement("ul");
    this.mappingsList.className = "gb-mapping-list";

    const mappingsHeading = document.createElement("h4");
    mappingsHeading.className = "gb-section-title";
    mappingsHeading.style.marginTop = "10px";
    mappingsHeading.style.fontSize = "12px";
    mappingsHeading.style.color = "#b8d7ff";
    mappingsHeading.textContent = "Saved Dodge Routes";

    const playerLabel = document.createElement("p");
    playerLabel.className = "gb-label";
    playerLabel.textContent = "Hrac (kam sa bude uhybat)";

    const townLabel = document.createElement("p");
    townLabel.className = "gb-label";
    townLabel.textContent = "Mesto ciela (nazov mesta)";

    const arrowRight = document.querySelector(
      "#ui_box > div.town_name_area > div.btn_next_town.button_arrow.right"
    );

    const arrowLeft = document.querySelector(
      "#ui_box > div.town_name_area > div.btn_prev_town.button_arrow.left"
    );

    if (arrowRight) {
      arrowRight.addEventListener("click", () => {
        this.refreshDodgeInfo();
        this.refreshMappingsList();
      });
    }

    if (arrowLeft) {
      arrowLeft.addEventListener("click", () => {
        this.refreshDodgeInfo();
        this.refreshMappingsList();
      });
    }

    // Placeholder text for the inputs
    playerNameInput.placeholder = "Enter Player Name";
    townNameInput.placeholder = "Enter Town Name";
    this.readOnlyInput.placeholder = "Not set";

    playerNameInput.setAttribute("id", "playerNameInput");
    townNameInput.setAttribute("id", "townNameInput");

    const formRow = document.createElement("div");
    formRow.className = "gb-row-full";

    const actionRow = document.createElement("div");
    actionRow.className = "gb-row";
    actionRow.appendChild(submit);
    actionRow.appendChild(startDodging);

    formRow.appendChild(playerLabel);
    formRow.appendChild(playerNameInput);
    formRow.appendChild(townLabel);
    formRow.appendChild(townNameInput);
    formRow.appendChild(this.readOnlyInput);

    section.appendChild(titleRow);
    section.appendChild(formRow);
    section.appendChild(actionRow);
    section.appendChild(mappingsHeading);
    section.appendChild(this.mappingsList);
    this.mainDiv.appendChild(section);

    this.refreshDodgeInfo();
    this.refreshMappingsList();
  }
}
