// ==========================================
// BEBI'S MEMORY JAR - CORE ENGINE & ALERTS
// ==========================================

const BebiEngine = (function() {

  // EmailJS Configuration Properties
  const MAIL_SERVICE = "service_m0nwde2";
  const MAIL_TEMPLATE = "template_pl7h7e9";

  // 1. TIMEZONE CONTROLLER
  function getTimeData() {
    const now = new Date();
    const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    const inTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    return {
      phHour: phTime.getHours(),
      inHour: inTime.getHours()
    };
  }

  // 2. HER STATUS (Anchored to India Time)
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

  // 3. YOUR CONTEXT (Anchored to Philippine Time)
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
    const herHour = times.inHour;
    const root = document.documentElement;

    if (herHour >= 20 || herHour < 5) {
      root.style.setProperty("--accent-yellow", "#fbbf24");
      root.style.setProperty("--text-dim", "#94a3b8");
      root.style.setProperty("--bg-mood", "#0b1220"); 
      root.style.setProperty("--card-mood", "#111c30"); 
    } else {
      root.style.setProperty("--accent-yellow", "#fde047");
      root.style.setProperty("--text-dim", "#a3b1c6");
      root.style.setProperty("--bg-mood", "#0f172a"); 
      root.style.setProperty("--card-mood", "#1e293b"); 
    }
  }

  // 7. EXTERNAL DISPATCH: EMAILJS DELIVERY SYSTEM
  async function dispatchAlert(type = "text", textPreview = "") {
    if (typeof emailjs === "undefined") {
      console.warn("EmailJS script not initialized yet.");
      return;
    }

    const typeDescriptions = {
      text: "📝 A sweet text note",
      voice: "🎤 A hidden audio recording",
      doodle: "🎨 A custom hand-drawn sketch"
    };

    const payloadParams = {
      memory_type: typeDescriptions[type] || "🎁 A fresh memory token",
      message_preview: textPreview ? textPreview : "Open your secure app dashboard link to uncover it... ✨"
    };

    try {
      await emailjs.send(MAIL_SERVICE, MAIL_TEMPLATE, payloadParams);
      console.log("📨 Security notification transmitted successfully.");
    } catch (err) {
      console.error("❌ Notification delivery failed:", err);
    }
  }

  // 8. SAFE ARCHITECTURE BOOT SEQUENCE
  function wakeUp() {
    try {
      applyThemeMood();

      const statusEl = document.getElementById("home-status");
      if (statusEl) statusEl.innerText = getEmotionalStatus();

      const whisperEl = document.getElementById("whisper-message");
      if (whisperEl && !whisperEl.innerText) { 
        whisperEl.innerText = `✨ "${getRandomMessage('soft')}"`;
      }

      const aliveEl = document.getElementById("alive-mood");
      if (aliveEl) aliveEl.innerText = getAliveMood();

      const inboxToneEl = document.getElementById("inbox-tone");
      if (inboxToneEl) inboxToneEl.innerText = getInboxStatus();

    } catch (error) {
      console.warn("Engine handling exception gracefully.", error);
    }
  }

  return { 
    boot: wakeUp, 
    getMessage: getRandomMessage,
    notify: dispatchAlert
  };

})();

document.addEventListener("DOMContentLoaded", BebiEngine.boot);
