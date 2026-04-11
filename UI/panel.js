"use strict";

import { FarmUI } from "./farm.js";
import { CultureUI } from "./culture.js";
import { DodgeUI } from "./dodge.js";
import { SilverVaultUI } from "./silvervault.js";
import { AutoFarm } from "../scripts/autofarm.js";
import { AutoCulture } from "../scripts/autoculture.js";
import { AttackDodger } from "../scripts/dodge.js";
import { AutoSilverVault } from "../scripts/autosilvervault.js";

export class MainUI {
  constructor() {
    this.panel = document.getElementsByClassName(
      "ui_construction_queue instant_buy"
    )[0];

    if (!this.panel || !this.panel.parentNode) {
      throw new Error("Unable to mount GrepolisBot UI panel.");
    }

    this.autoFarm = new AutoFarm();
    this.autoCulture = new AutoCulture();
    this.attackDodger = new AttackDodger();
    this.autoSilverVault = new AutoSilverVault();

    this.injectStyles();
    this.createMainDiv();
    this.addDragFunctionality();
    this.createAutoFarmUI();
  }

  injectStyles() {
    if (document.getElementById("grepolisbot-theme")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "grepolisbot-theme";
    style.textContent = `
      [name="bot-main-div"] {
        position: absolute;
        left: 12px;
        top: 12px;
        width: 340px;
        max-height: 78vh;
        overflow-y: auto;
        z-index: 1000;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.22);
        background:
          radial-gradient(circle at 0% 0%, rgba(244, 170, 78, 0.22), transparent 45%),
          radial-gradient(circle at 100% 0%, rgba(41, 93, 151, 0.22), transparent 48%),
          linear-gradient(160deg, rgba(15, 25, 44, 0.9), rgba(10, 14, 27, 0.92));
        box-shadow: 0 16px 45px rgba(6, 10, 22, 0.55);
        backdrop-filter: blur(7px);
        box-sizing: border-box;
        padding: 12px;
        font-family: "Trebuchet MS", "Segoe UI", sans-serif;
        color: #eef3ff;
      }

      .gb-drag-handle {
        cursor: move;
        user-select: none;
        border-radius: 12px;
        border: 1px solid rgba(243, 194, 94, 0.45);
        background: linear-gradient(120deg, rgba(216, 137, 58, 0.3), rgba(53, 104, 163, 0.26));
        padding: 9px 12px;
        margin-bottom: 12px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 12px;
        font-weight: 700;
      }

      .gb-easter-egg {
        display: none;
        margin: -6px 0 10px;
        font-size: 11px;
        color: #ffe9b8;
        text-align: right;
      }

      .gb-easter-egg.visible {
        display: block;
      }

      .gb-tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 10px;
      }

      .gb-tab {
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 10px;
        background: rgba(10, 23, 45, 0.55);
        color: #eaf0ff;
        padding: 7px 10px;
        font-weight: 700;
        font-size: 12px;
        cursor: pointer;
      }

      .gb-tab.active {
        border-color: rgba(243, 194, 94, 0.55);
        background: linear-gradient(150deg, rgba(244, 160, 61, 0.35), rgba(204, 111, 42, 0.3));
        color: #fff6e8;
      }

      .gb-page {
        display: block;
      }

      .gb-page.hidden {
        display: none;
      }

      .gb-section {
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: linear-gradient(150deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
        border-radius: 12px;
        padding: 10px;
        margin-bottom: 10px;
      }

      .gb-section-title {
        font-size: 14px;
        margin: 0 0 8px;
        letter-spacing: 0.03em;
      }

      .gb-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .gb-info-badge {
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.35);
        background: rgba(11, 26, 50, 0.78);
        color: #d8e8ff;
        font-size: 11px;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: help;
      }

      .gb-tooltip {
        position: absolute;
        right: 0;
        top: 24px;
        width: 220px;
        padding: 8px;
        border-radius: 8px;
        background: rgba(5, 12, 24, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #d9e7ff;
        font-size: 11px;
        line-height: 1.35;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-4px);
        transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
        z-index: 2000;
      }

      .gb-info-badge:hover .gb-tooltip {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .gb-hint {
        margin: 0 0 8px;
        font-size: 11px;
        line-height: 1.35;
        color: #c4d8ff;
      }

      .gb-label {
        margin: 2px 0 4px;
        font-size: 11px;
        color: #e0ecff;
        letter-spacing: 0.02em;
      }

      .gb-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
        margin-bottom: 8px;
      }

      .gb-row-full {
        display: grid;
        gap: 8px;
      }

      .gb-select,
      .gb-input {
        border: 1px solid rgba(224, 234, 255, 0.35);
        border-radius: 8px;
        background: rgba(3, 13, 31, 0.56);
        color: #eff4ff;
        padding: 7px 9px;
        font-size: 13px;
      }

      .gb-input::placeholder {
        color: rgba(220, 230, 255, 0.55);
      }

      .gb-btn {
        border: 1px solid rgba(255, 224, 158, 0.45);
        border-radius: 8px;
        background: linear-gradient(150deg, #f4a03d, #cc6f2a);
        color: #11203b;
        font-weight: 700;
        padding: 7px 11px;
        min-width: 74px;
        cursor: pointer;
      }

      .gb-btn:hover {
        filter: brightness(1.05);
      }

      .gb-muted {
        border: 1px solid rgba(168, 203, 255, 0.28);
        background: rgba(6, 18, 38, 0.5);
        color: #d3e0fc;
      }

      .gb-mapping-list {
        list-style: none;
        margin: 8px 0 0;
        padding: 0;
        border-top: 1px solid rgba(255, 255, 255, 0.14);
      }

      .gb-mapping-item {
        font-size: 12px;
        color: #dbe7ff;
        padding: 7px 2px;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
      }
    `;

    document.head.appendChild(style);
  }

  createMainDiv() {
    this.mainDiv = document.createElement("div");
    this.mainDiv.setAttribute("name", "bot-main-div");

    this.dragHandle = document.createElement("div");
    this.dragHandle.className = "gb-drag-handle";
    this.dragHandle.textContent = "GrepolisBot Control Deck";
    this.mainDiv.appendChild(this.dragHandle);

    this.easterEgg = document.createElement("div");
    this.easterEgg.className = "gb-easter-egg";
    this.easterEgg.textContent = "Forged by ničite4000l | GitHub: NaKamize";
    this.mainDiv.appendChild(this.easterEgg);

    this.dragHandle.addEventListener("dblclick", () => {
      this.easterEgg.classList.toggle("visible");
    });

    this.tabBar = document.createElement("div");
    this.tabBar.className = "gb-tabs";

    this.automationTab = document.createElement("button");
    this.automationTab.className = "gb-tab active";
    this.automationTab.textContent = "Automation";

    this.dodgeTab = document.createElement("button");
    this.dodgeTab.className = "gb-tab";
    this.dodgeTab.textContent = "Dodge";

    this.tabBar.appendChild(this.automationTab);
    this.tabBar.appendChild(this.dodgeTab);
    this.mainDiv.appendChild(this.tabBar);

    this.automationPage = document.createElement("div");
    this.automationPage.className = "gb-page";

    this.dodgePage = document.createElement("div");
    this.dodgePage.className = "gb-page hidden";

    this.mainDiv.appendChild(this.automationPage);
    this.mainDiv.appendChild(this.dodgePage);

    let parentDiv = this.panel.parentNode;
    parentDiv.insertBefore(this.mainDiv, this.panel);

    this.wireTabs();
  }

  wireTabs() {
    this.automationTab.addEventListener("click", () => {
      this.automationTab.classList.add("active");
      this.dodgeTab.classList.remove("active");
      this.automationPage.classList.remove("hidden");
      this.dodgePage.classList.add("hidden");
    });

    this.dodgeTab.addEventListener("click", () => {
      this.dodgeTab.classList.add("active");
      this.automationTab.classList.remove("active");
      this.dodgePage.classList.remove("hidden");
      this.automationPage.classList.add("hidden");
    });
  }

  addDragFunctionality() {
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    const startDrag = (event) => {
      isDragging = true;
      dragOffsetX = event.clientX - this.mainDiv.offsetLeft;
      dragOffsetY = event.clientY - this.mainDiv.offsetTop;
    };

    const endDrag = () => {
      isDragging = false;
    };

    const drag = (event) => {
      if (isDragging) {
        this.mainDiv.style.left = event.clientX - dragOffsetX + "px";
        this.mainDiv.style.top = event.clientY - dragOffsetY + "px";
      }
    };

    this.dragHandle.addEventListener("mousedown", startDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("mousemove", drag);
  }

  createAutoFarmUI() {
    let farm = new FarmUI(this.automationPage, this.autoFarm);
    farm.createFarmUI();
    let culture = new CultureUI(this.automationPage, this.autoCulture);
    culture.createCultureUI();
    let silverVault = new SilverVaultUI(this.automationPage, this.autoSilverVault);
    silverVault.createSilverVaultUI();
    let dodge = new DodgeUI(this.dodgePage, this.attackDodger);
    dodge.createDodgeUI();
  }
}
