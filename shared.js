// shared.js
function getAliveMood() {
  const hrs = new Date().getHours();
  
  if (hrs >= 5 && hrs < 12) {
    return "Morning light... checking in on you ☀️";
  } else if (hrs >= 12 && hrs < 17) {
    return "Afternoon silence... but memories are active 💭";
  } else if (hrs >= 17 && hrs < 21) {
    return "Evening calm... always thinking of you 🌙";
  } else {
    return "Late night quiet... guarding your jar ✨";
  }
}
