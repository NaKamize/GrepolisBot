export const SELECTORS = {
  dialogs: {
    closeButton:
      "body > div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.js-window-main-container > div.ui-dialog-titlebar.ui-corner-all.ui-widget-header.ui-helper-clearfix.ui-draggable-handle > button",
  },
  farm: {
    overviewLink:
      "#overviews_link_hover_menu > div.box.middle.left > div > div > ul > li.subsection.captain.enabled > ul > li.farm_town_overview > a",
    selectAll:
      "#fto_town_wrapper > div > div.game_header.bold > span.checkbox_wrapper > a",
    claimButton: "#fto_claim_button > div.caption.js-caption",
    confirmButton:
      ".window_content.js-window-content > div > div.buttons > div.btn_confirm.button_new > div.caption.js-caption",
  },
  culture: {
    overviewLink:
      "#overviews_link_hover_menu > div.box.middle.left > div > div > ul > li.subsection.curator.enabled > ul > li.culture_overview > a",
    startAllButton: "#start_all_celebrations",
    celebrationSelect: "#place_celebration_select",
  },
  silverVault: {
    overviewLink:
      "#overviews_link_hover_menu > div.box.middle.left > div > div > ul > li.subsection.curator.enabled > ul > li.hides_overview > a",
    keepInput: "#hides_overview_all_towns_iron_keep > div.body > input[type=text]",
    storeInput: "#hides_overview_all_towns_iron_store > div.body > input[type=text]",
    confirmButton: "#store_iron_in_all_towns",
    closeAllWindows:
      "#ui_box > div.btn_close_all_windows > div.middle > div > div.box-middle > div",
  },
};
