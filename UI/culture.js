"use strict";

export class CultureUI {
  constructor(mainDiv, autoCulture) {
    this.mainDiv = mainDiv;
    this.autoCulture = autoCulture;
    this.isRunning = false;
  }

  createHeading() {
    const heading = document.createElement("h3");
    heading.textContent = "Culture Planner";
    heading.className = "gb-section-title";
    heading.style.color = "#ffd77d";
    return heading;
  }

  createDropDown(optionValues, name) {
    const dropDown = document.createElement("select");
    dropDown.setAttribute("name", name);
    dropDown.className = "gb-select";

    for (let i = 0; i < optionValues.length; i++) {
      const option = document.createElement("option");
      option.text = optionValues[i];
      dropDown.appendChild(option);
    }

    return dropDown;
  }

  createMinutesInput() {
    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.step = "1";
    input.value = "60";
    input.placeholder = "Interval (minutes)";
    input.setAttribute("name", "culture-interval-minutes");
    input.className = "gb-input";
    return input;
  }

  createButton() {
    const button = document.createElement("button");
    button.textContent = "Start";
    button.className = "gb-btn";

    button.addEventListener("click", async () => {
      const minutesInput = document.querySelector(
        "input[name='culture-interval-minutes']"
      );
      const optDropDown = document.querySelector(
        "select[name='option-drop-down']"
      );
      const selectedValue = minutesInput.value;
      const selectedOption = optDropDown.value;

      if (!this.isRunning) {
        this.isRunning = true;
        button.textContent = "Stop";
        try {
          await this.autoCulture.start(selectedOption, selectedValue);
        } catch (error) {
          console.error("Failed to start AutoCulture:", error);
          this.autoCulture.stop();
        }
        this.isRunning = false;
        button.textContent = "Start";
        return;
      }

      this.autoCulture.stop();
      this.isRunning = false;
      button.textContent = "Start";
    });

    return button;
  }

  createAutoCultureDiv(name) {
    const autoFarmDiv = document.createElement("div");
    autoFarmDiv.className = name + " gb-row";
    return autoFarmDiv;
  }

  createCultureUI() {
    const section = document.createElement("section");
    section.className = "gb-section";

    const optionValues = [
      "Mestský festival",
      "Olympijské hry",
      "Víťazná procesia",
      "Divadelné hry",
    ];

    const heading = this.createHeading();
    const titleRow = document.createElement("div");
    titleRow.className = "gb-title-row";

    const infoBadge = document.createElement("span");
    infoBadge.className = "gb-info-badge";
    infoBadge.textContent = "i";

    const tooltip = document.createElement("span");
    tooltip.className = "gb-tooltip";
    tooltip.textContent =
      "Zadaj interval v minutach. Kultura sa po spusteni opakuje kazdych X minut + nahodny delay 60-90 sekund.";
    infoBadge.appendChild(tooltip);

    titleRow.appendChild(heading);
    titleRow.appendChild(infoBadge);

    const typeLabel = document.createElement("p");
    typeLabel.className = "gb-label";
    typeLabel.textContent = "Typ oslavy";

    const intervalLabel = document.createElement("p");
    intervalLabel.className = "gb-label";
    intervalLabel.textContent = "Interval opakovania (minuty)";

    const dropDown = this.createDropDown(optionValues, "option-drop-down");
    const minutesInput = this.createMinutesInput();
    minutesInput.placeholder = "Napr. 60 min";
    const button = this.createButton();
    const autoCultureDiv = this.createAutoCultureDiv("auto-culture-options");
    const autoCultureDiv1 = this.createAutoCultureDiv("auto-culture-timer");

    autoCultureDiv.appendChild(dropDown);

    autoCultureDiv1.appendChild(minutesInput);
    autoCultureDiv1.appendChild(button);

    section.appendChild(titleRow);
    section.appendChild(typeLabel);
    section.appendChild(autoCultureDiv);
    section.appendChild(intervalLabel);
    section.appendChild(autoCultureDiv1);
    this.mainDiv.appendChild(section);
  }
}
