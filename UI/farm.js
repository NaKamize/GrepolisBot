"use strict";

export class FarmUI {
  constructor(mainDiv, autoFarm) {
    this.mainDiv = mainDiv;
    this.autoFarm = autoFarm;
    this.isRunning = false;
  }

  createHeading() {
    const heading = document.createElement("h3");
    heading.textContent = "Farm Manager";
    heading.className = "gb-section-title";
    heading.style.color = "#74ff97";
    return heading;
  }

  createDropDown() {
    const dropDown = document.createElement("select");
    dropDown.setAttribute("name", "farm-drop-down");
    dropDown.className = "gb-select";

    const optionValues = [
      "00:05:00",
      "00:10:00",
      "00:20:00",
      "00:40:00",
      "01:30:00",
      "03:00:00",
      "04:00:00",
      "08:00:00",
    ];

    for (let i = 0; i < optionValues.length; i++) {
      const option = document.createElement("option");
      option.text = optionValues[i];
      dropDown.appendChild(option);
    }

    return dropDown;
  }

  createButton() {
    const button = document.createElement("button");
    button.textContent = "Start";
    button.className = "gb-btn";

    button.addEventListener("click", async () => {
      const dropDown = document.querySelector("select[name='farm-drop-down']");
      const selectedValue = dropDown.value;

      if (!this.isRunning) {
        this.isRunning = true;
        button.textContent = "Stop";
        try {
          await this.autoFarm.start(selectedValue);
        } catch (error) {
          console.error("Failed to start AutoFarm:", error);
          this.autoFarm.stop();
        }
        this.isRunning = false;
        button.textContent = "Start";
        return;
      }

      this.autoFarm.stop();
      this.isRunning = false;
      button.textContent = "Start";
    });

    return button;
  }

  createAutoFarmDiv() {
    const autoFarmDiv = document.createElement("div");
    autoFarmDiv.className = "auto-farm gb-row";
    return autoFarmDiv;
  }

  createFarmUI() {
    const section = document.createElement("section");
    section.className = "gb-section";

    const heading = this.createHeading();
    const hint = document.createElement("p");
    hint.className = "gb-hint";
    hint.textContent =
      "Vyber interval vo formate HH:MM:SS. Po kazdom kole sa prida nahodny delay 5-30 sekund.";

    const label = document.createElement("p");
    label.className = "gb-label";
    label.textContent = "Interval farmenia (HH:MM:SS)";

    const dropDown = this.createDropDown();
    const button = this.createButton();
    const autoFarmDiv = this.createAutoFarmDiv();

    autoFarmDiv.appendChild(dropDown);
    autoFarmDiv.appendChild(button);

    section.appendChild(heading);
    section.appendChild(hint);
    section.appendChild(label);
    section.appendChild(autoFarmDiv);
    this.mainDiv.appendChild(section);
  }
}
