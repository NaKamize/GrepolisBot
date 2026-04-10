import * as esbuild from "esbuild";

const userscriptBanner = `// ==UserScript==\n// @name         GrepolisBot\n// @namespace    https://github.com/NaKamize/GrepolisBot\n// @version      2.0.0\n// @description  Automates farm collection, culture events, and attack dodging in Grepolis\n// @author       ničite4000l\n// @homepageURL  https://github.com/NaKamize/GrepolisBot\n// @match        *://*.grepolis.com/*\n// @grant        none\n// ==/UserScript==`;

const isWatchMode = process.argv.includes("--watch");

const sharedOptions = {
  entryPoints: ["main.js"],
  outfile: "script",
  bundle: true,
  format: "iife",
  target: "es2018",
  platform: "browser",
  charset: "utf8",
  legalComments: "none",
  banner: {
    js: userscriptBanner,
  },
};

if (isWatchMode) {
  const context = await esbuild.context({
    ...sharedOptions,
    sourcemap: true,
    minify: false,
  });
  await context.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build({
    ...sharedOptions,
    sourcemap: false,
    minify: true,
  });
}
