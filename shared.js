const BebiEngine = (function() {
  function getTimeData() {
    const now = new Date();
    return { phHour: new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" })).getHours(), 
             inHour: new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).getHours() };
  }

  function applyThemeMood() {
    const herHour = getTimeData().inHour;
    const root = document.documentElement;
    if (herHour >= 20 || herHour < 5) {
      root.style.setProperty("--accent-yellow", "#fbbf24");
      root.style.setProperty("--bg-color", "#0b1220");
    }
  }

  return { 
    boot: () => { applyThemeMood(); console.log("Engine Active"); }
  };
})();
document.addEventListener("DOMContentLoaded", BebiEngine.boot);
