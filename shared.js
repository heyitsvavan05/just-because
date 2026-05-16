// =============================
// SHARED EMOTIONAL SYSTEM CORE
// =============================

// Get PH + India times if needed later
function getTimeData() {
  const now = new Date();

  const phHour = now.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    hour12: false
  });

  const inHour = now.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false
  });

  return {
    phHour: parseInt(phHour),
    inHour: parseInt(inHour)
  };
}

// Main emotional status logic (USED ACROSS ALL PAGES)
function getEmotionalStatus() {
  const hour = new Date().getHours();

  // Your PH work shift: 8PM - 5AM
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

// Slightly different version for inbox page (more comforting tone)
function getInboxStatus() {
  const hour = new Date().getHours();

  if (hour >= 20 || hour < 5) {
    return "💌 He's busy right now, but still leaving you something here.";
  }

  return getEmotionalStatus();
}

// Random soft messages (for future expansion)
function getRandomMessage(type = "soft") {
  const messages = {
    soft: [
      "I'm still here with you.",
      "You’re not alone right now.",
      "I’m just a little busy, baby.",
      "Thinking of you quietly.",
      "Come here…"
    ],
    anxious: [
      "Hey… breathe. I’m still here.",
      "Don’t overthink it, okay?",
      "We’re okay. I promise.",
      "I’m just working, not gone.",
      "You can relax, baby."
    ]
  };

  const list = messages[type] || messages.soft;
  return list[Math.floor(Math.random() * list.length)];
}

// Apply shared theme tweaks based on time
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

// Auto-run theme on load
applyThemeMood();