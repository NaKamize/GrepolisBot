"use strict";

import { MainUI } from "./UI/panel.js";

(function () {
  window.addEventListener("load", function () {
    setTimeout(function () {
      try {
        new MainUI();
      } catch (error) {
        console.error("GrepolisBot failed to initialize:", error);
      }
    }, 2000); // 2000 milliseconds = 2 seconds delay
  });
})();
