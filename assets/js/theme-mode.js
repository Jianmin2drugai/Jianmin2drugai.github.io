/* Apply the saved preference before paint; storage may be blocked by the browser. */
(function () {
  "use strict";
  var root = document.documentElement;
  var system = window.matchMedia("(prefers-color-scheme: dark)");
  var preference;
  try { preference = localStorage.getItem("theme"); } catch (error) { /* Use system preference. */ }
  function apply(mode) {
    root.setAttribute("data-theme", mode);
    var button = document.querySelector(".theme-switch");
    if (button) {
      button.hidden = false;
      button.setAttribute("aria-pressed", String(mode === "dark"));
      button.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }
  function systemMode() { return system.matches ? "dark" : "light"; }
  if (preference !== "dark" && preference !== "light") preference = null;
  apply(preference || systemMode());
  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-theme"));
    var button = document.querySelector(".theme-switch");
    if (button) button.addEventListener("click", function () {
      preference = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(preference);
      try { localStorage.setItem("theme", preference); } catch (error) { /* Keep session selection. */ }
    });
    window.dispatchEvent(new Event("resize"));
  });
  function systemChanged() { if (!preference) apply(systemMode()); }
  if (system.addEventListener) system.addEventListener("change", systemChanged);
  else if (system.addListener) system.addListener(systemChanged);
}());
