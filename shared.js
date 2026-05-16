// =============================
// SHARED EMOTIONAL + ALIVE MODE
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

// 🌙 Alive Mood (for home screen)
function getAliveMood() {
  const h = new Date().getHours();

  if (h >= 1 && h <= 5) return "She’s probably asleep… but your message is still waiting 🌙";
  if (h <= 11) return "Morning — if she opens this, she might smile ☀️";
  if (h <= 17) return "Afternoon silence… but memories are active 💭";
  if (h <= 23) return "Night again… this is when missing hits hardest 🌌";

  return "Somewhere between thoughts and memories…";
}

// theme
function applyThemeMood() {
  const hour = new Date().getHours();
  const root = document.documentElement;

  if (hour >= 20 || hour < 5) {
    root.style.setProperty("--accent-yellow", "#fbbf24");
  } else {
    root.style.setProperty("--accent-yellow", "#fde047");
  }
}

applyThemeMood();