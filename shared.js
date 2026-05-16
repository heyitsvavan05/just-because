// =============================
// BEBI'S MEMORY JAR - CORE ENGINE
// =============================

const BebiEngine = (function() {

  // 1. TIMEZONE CONTROLLER
  function getTimeData() {
    const now = new Date();
    // Force calculate exact hours regardless of device location
    const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    const inTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    return {
      phHour: phTime.getHours(),
      inHour: inTime.getHours()
    };
  }

  // 2. HER STATUS (Anchored to India Time - checking on your wife)
  function getEmotionalStatus() {
    const times = getTimeData();
    const herHour = times.inHour;

    if (herHour >= 20 || herHour < 5) {
      return "🌙 She's working right now... but you're still on her mind.";
    }
    if (herHour >= 5 && herHour < 12) {
      return "😴 She just finished work. Probably sleeping now.";
    }
    if (herHour >= 12 && herHour < 18) {
      return "🟢 She's awake. You can open anything here.";
    }
    return "🌤️ Evening is coming... she might start work soon.";
  }

  // 3. YOUR CONTEXT (Anchored to Philippine Time - for when she views your status)
  function getAliveMood() {
    const times = getTimeData();
    const hisHour = times.phHour;

    if (hisHour >= 1 && hisHour <= 5) {
      return "He’s probably asleep… but your message is still waiting 🌙";
    }
    if (hisHour >= 6 && hisHour <= 11) {
      return "Morning — if he opens this, he might smile ☀️";
    }
    if (hisHour >= 12 && hisHour <= 17) {
      return "Afternoon silence… but memories are active 💭";
    }
    return "Night again… this is when missing hits hardest 🌌";
  }

  // 4. INBOX STATUS (SOFTER TONE)
  function getInboxStatus() {
    const times = getTimeData();
    const herHour = times.inHour;

    if (herHour >= 20 || herHour < 5) {
      return "💌 She's busy right now, but still leaving you something here.";
    }
    return getEmotionalStatus();
  }

  // 5. RANDOM MESSAGE INJECTOR
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

  // 6. THEME ENGINE (AUTO MOOD SHIFT)
  function applyThemeMood() {
    const times = getTimeData();
    const herHour = times.inHour; // Base the mood on her environment
    const root = document.documentElement;

    if (herHour >= 20 || herHour < 5) {
      root.style.setProperty("--accent-yellow", "#fbbf24");
      root.style.setProperty("--text-dim", "#94a3b8");
      root.style.setProperty("--bg-mood", "#0b1220"); 
    } else {
      root.style.setProperty("--accent-yellow", "#fde047");
      root.style.setProperty("--text-dim", "#a3b1c6");
      root.style.setProperty("--bg-mood", "#0f172a"); 
    }
  }

  // 7. SAFE ARCHITECTURE BOOT SEQUENCE
  function wakeUp() {
    try {
      applyThemeMood();

      // Safely update elements if they exist on the current page
      const statusEl = document.getElementById("home-status");
      if (statusEl) statusEl.innerText = getEmotionalStatus();

      // INJECTS HOME SCREEN WHISPER NOTE
      const whisperEl = document.getElementById("whisper-message");
      if (whisperEl && !whisperEl.innerText) { 
        whisperEl.innerText = `✨ "${getRandomMessage('soft')}"`;
      }

      const aliveEl = document.getElementById("alive-mood");
      if (aliveEl) aliveEl.innerText = getAliveMood();

      const inboxToneEl = document.getElementById("inbox-tone");
      if (inboxToneEl) inboxToneEl.innerText = getInboxStatus();

    } catch (error) {
      console.warn("Engine resting... handled gracefully.", error);
    }
  }

  return { boot: wakeUp, getMessage: getRandomMessage };

})();

// Auto-start when the page loads
document.addEventListener("DOMContentLoaded", BebiEngine.boot);
