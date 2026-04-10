"use strict";

export class SilverVaultUI {
  constructor(mainDiv, autoSilverVault) {
    this.mainDiv = mainDiv;
    this.autoSilverVault = autoSilverVault;
    this.isRunning = false;
  }

  createHeading() {
    const heading = document.createElement("h3");
    heading.textContent = "Silver Vault";
    heading.className = "gb-section-title";
    heading.style.color = "#9fd5ff";
    return heading;
  }

  createInput(name, placeholder, value) {
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "1";
    input.className = "gb-input";
    input.setAttribute("name", name);
    input.placeholder = placeholder;
    input.value = value;
    return input;
  }

  createButton() {
    const button = document.createElement("button");
    button.textContent = "Start";
    button.className = "gb-btn";

    button.addEventListener("click", async () => {
      const keepInput = document.querySelector(
        "input[name='silver-vault-keep']"
      );
      const storeInput = document.querySelector(
        "input[name='silver-vault-store']"
      );
      const intervalInput = document.querySelector(
        "input[name='silver-vault-interval']"
      );

      if (!this.isRunning) {
        this.isRunning = true;
        button.textContent = "Stop";

        try {
          await this.autoSilverVault.start({
            keepAmount: keepInput.value,
            storeAmount: storeInput.value,
            intervalMinutes: intervalInput.value,
          });
        } catch (error) {
          console.error("Failed to start Silver Vault automation:", error);
          this.autoSilverVault.stop();
        }

        this.isRunning = false;
        button.textContent = "Start";
        return;
      }

      this.autoSilverVault.stop();
      this.isRunning = false;
      button.textContent = "Start";
    });

    return button;
  }

  createSilverVaultUI() {
    const section = document.createElement("section");
    section.className = "gb-section";

    const heading = this.createHeading();
    const hint = document.createElement("p");
    hint.className = "gb-hint";
    hint.textContent =
      "Zadaj hodnoty v striebre. Cyklus bezi podla intervalu v minutach + nahodny delay 30-300 sekund.";

    const keepLabel = document.createElement("p");
    keepLabel.className = "gb-label";
    keepLabel.textContent = "Ponechat v meste (striebra)";

    const keepInput = this.createInput(
      "silver-vault-keep",
      "Napr. 15000 striebra",
      "15000"
    );

    const storeLabel = document.createElement("p");
    storeLabel.className = "gb-label";
    storeLabel.textContent = "Ulozit do jaskyne (striebra)";

    const storeInput = this.createInput(
      "silver-vault-store",
      "Napr. 5000 striebra",
      "5000"
    );

    const intervalLabel = document.createElement("p");
    intervalLabel.className = "gb-label";
    intervalLabel.textContent = "Interval opakovania (minuty)";

    const intervalInput = this.createInput(
      "silver-vault-interval",
      "Napr. 30 min",
      "30"
    );
    intervalInput.min = "1";

    const startButton = this.createButton();

    const inputs = document.createElement("div");
    inputs.className = "gb-row-full";
    inputs.appendChild(keepLabel);
    inputs.appendChild(keepInput);
    inputs.appendChild(storeLabel);
    inputs.appendChild(storeInput);
    inputs.appendChild(intervalLabel);
    inputs.appendChild(intervalInput);

    const action = document.createElement("div");
    action.className = "gb-row";
    const spacer = document.createElement("div");
    action.appendChild(spacer);
    action.appendChild(startButton);

    section.appendChild(heading);
    section.appendChild(hint);
    section.appendChild(inputs);
    section.appendChild(action);

    this.mainDiv.appendChild(section);
  }
}
