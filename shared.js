// ==========================================
// BEBI'S MEMORY JAR - CORE ENGINE & ALERTS
// ==========================================

const BebiEngine = (function() {
  const MAIL_SERVICE = "service_m0nwde2";
  const MAIL_TEMPLATE = "template_pl7h7e9";

  function getTimeData() {
    const now = new Date();
    const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    const inTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    return { phHour: phTime.getHours(), inHour: inTime.getHours() };
  }

  function getEmotionalStatus() {
    const herHour = getTimeData().inHour;
    if (herHour >= 20 || herHour < 5) return "🌙 She's working right now... but you're still on her mind.";
    if (herHour >= 5 && herHour < 12) return "😴 She just finished work. Probably sleeping now.";
    if (herHour >= 12 && herHour < 18) return "🟢 She's awake. You can open anything here.";
    return "🌤️ Evening is coming... she might start work soon.";
  }

  function getAliveMood() {
    const hisHour = getTimeData().phHour;
    if (hisHour >= 1 && hisHour <= 5) return "He’s probably asleep… but your message is still waiting 🌙";
    if (hisHour >= 6 && hisHour <= 11) return "Morning — if he opens this, he might smile ☀️";
    if (hisHour >= 12 && hisHour <= 17) return "Afternoon silence… but memories are active 💭";
    return "Night again… this is when missing hits hardest 🌌";
  }

  function getInboxStatus() {
    const herHour = getTimeData().inHour;
    return (herHour >= 20 || herHour < 5) ? "💌 She's busy right now, but still leaving you something here." : getEmotionalStatus();
  }

  function applyThemeMood() {
    const herHour = getTimeData().inHour;
    const root = document.documentElement;
    if (herHour >= 20 || herHour < 5) {
      root.style.setProperty("--accent-yellow", "#fbbf24");
      root.style.setProperty("--bg-color", "#0b1220"); 
    } else {
      root.style.setProperty("--accent-yellow", "#fde047");
      root.style.setProperty("--bg-color", "#0f172a"); 
    }
  }

  return { 
    boot: () => {
      applyThemeMood();
      const statusEl = document.getElementById("home-status");
      const aliveEl = document.getElementById("alive-mood");
      const inboxEl = document.getElementById("inbox-tone");
      if (statusEl) statusEl.innerText = getEmotionalStatus();
      if (aliveEl) aliveEl.innerText = getAliveMood();
      if (inboxEl) inboxEl.innerText = getInboxStatus();
    }
  };
})();

document.addEventListener("DOMContentLoaded", BebiEngine.boot);
