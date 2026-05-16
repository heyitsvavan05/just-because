// =============================
// SHARED EMOTIONAL SYSTEM CORE (FINAL)
// =============================

// Time helper (future-proof)
function getTimeData() {
  const now = new Date();

  return {
    phHour: parseInt(
      now.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        hour12: false
      })
    ),
    inHour: parseInt(
      now.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false
      })
    ),
    localHour: now.getHours()
  };
}


// =============================
// MAIN STATUS (INDEX / GENERAL)
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


// =============================
// INBOX STATUS (SOFTER TONE)
// =============================
function getInboxStatus() {
  const hour = new Date().getHours();

  if (hour >= 20 || hour < 5) {
    return "💌 He's busy right now, but still leaving you something here.";
  }

  return getEmotionalStatus();
}


// =============================
// 🌙 ALIVE MODE (NEW FINAL LAYER)
// =============================
function getAliveMood() {
  const hour = new Date().getHours();

  if (hour >= 1 && hour <= 5) {
    return "She’s probably asleep… but your message is still waiting 🌙";
  }

  if (hour >= 6 && hour <= 11) {
    return "Morning — if she opens this, she might smile ☀️";
  }

  if (hour >= 12 && hour <= 17) {
    return "Afternoon silence… but memories are active 💭";
  }

  if (hour >= 18 && hour <= 23) {
    return "Night again… this is when missing hits hardest 🌌";
  }

  return "Somewhere between thoughts and memories…";
}


// =============================
// RANDOM MESSAGE SYSTEM
// =============================
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


// =============================
// THEME ENGINE (AUTO MOOD SHIFT)
// =============================
function applyThemeMood() {
  const hour = new Date().getHours();
  const root = document.documentElement;

  if (hour >= 20 || hour < 5) {
    root.style.setProperty("--accent-yellow", "#fbbf24");
    root.style.setProperty("--text-dim", "#94a3b8");
    root.style.setProperty("--bg-mood", "#0b1220");
  } else {
    root.style.setProperty("--accent-yellow", "#fde047");
    root.style.setProperty("--text-dim", "#a3b1c6");
    root.style.setProperty("--bg-mood", "#0f172a");
  }
}


// =============================
// AUTO RUN
// =============================
applyThemeMood();