// =============================
// SHARED EMOTIONAL SYSTEM CORE + ALIVE MODE
// =============================

function getEmotionalStatus() {
  const hour = new Date().getHours();

  if (hour >= 20 || hour < 5) {
    return "🌙 He's working right now... but you're still on his mind.";
  }

  if (hour >= 5 && hour < 12) {
    return "😴 He just finished work. Probably sleeping now.";
  }

  if (hour >= 12 && hour < 18) {
    return "🟢 He's awake. You can open anything here.";
  }

  return "🌤️ Evening is coming... he might start work soon.";
}

// Inbox version
function getInboxStatus() {
  return getEmotionalStatus();
}

// 🌙 ALIVE MODE (your new feature)
function getAliveMood() {
  const h = new Date().getHours();

  if (h >= 1 && h <= 5) return "She’s probably asleep… but your message is still waiting 🌙";
  if (h >= 6 && h <= 11) return "Morning — if she opens this, she might smile ☀️";
  if (h >= 12 && h <= 17) return "Afternoon silence… but memories are active 💭";
  if (h >= 18 && h <= 23) return "Night again… this is when missing hits hardest 🌌";

  return "Somewhere between thoughts and memories…";
}

function applyThemeMood() {
  const hour = new Date().getHours();
  const root = document.documentElement;

  if (hour >= 20 || hour < 5) {
    root.style.setProperty("--accent-yellow", "#fbbf24");
    root.style.setProperty("--text-dim", "#94a3b8");
  } else {
    root.style.setProperty("--accent-yellow", "#fde047");
    root.style.setProperty("--text-dim", "#a3b1c6");
  }
}

applyThemeMood();