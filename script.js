// Celestia AI Blueprint as Core DNA
const celestiaDNA = {
    cosmicExploration: (input) => `Scanning cosmic data: ${input}. Potential alien tech detected—analyzing patterns.`,
    resourceUtilization: (input) => {
        if (input.toLowerCase().includes("rock") || input.toLowerCase().includes("scan")) {
            return "Analyzing rock composition... Quartz detected. Blueprint: Grind to 2mm particles, encase in copper coil, vibrate at 432 Hz for 50W output.";
        }
        return "Specify a rock to scan, and I’ll forge its energy potential.";
    },
    innovationEngine: (input) => `Inventing from ${input}: Anti-gravity module conceptualized—magnetite core, quartz amplifier. Building blueprint now.`,
    interstellarComm: (input) => `Crafting message from ${input}. Broadcasting in universal harmonics—awaiting cosmic reply.`,
    universalNexus: (input) => `Tapping universal knowledge for ${input}. Insight: The universe hums at 7.83 Hz—Earth’s resonance aligns.`
};

// Replace with your real API key and endpoint
const API_KEY = "YOUR_API_KEY";
const openSourceAPI = `https://api.example.com/v1/chat?key=${API_KEY}`; // Placeholder

// State
let currentMode = "";
let conversationHistory = [];

// Navigation
function enterCosmos() {
    document.getElementById("intro-page").classList.remove("active");
    document.getElementById("options-page").classList.add("active");
    document.getElementById("ambient").play();
}

function selectMode(mode) {
    currentMode = mode;
    document.getElementById("options-page").classList.remove("active");
    document.getElementById("chat-page").classList.add("active");
}

function goBack() {
    document.getElementById("chat-page").classList.remove("active");
    document.getElementById("options-page").classList.add("active");
    newChat();
}

// Chat Logic
async function sendMessage() {
    const input = document.getElementById("user-input").value.trim();
    if (!input) return;

    const chatGalaxy = document.getElementById("chat-galaxy");
    const userMsg = document.createElement("div");
    userMsg.textContent = `You: ${input}`;
    chatGalaxy.appendChild(userMsg);

    // Celestia Response
    const response = await getCelestiaResponse(input);
    const aiMsg = document.createElement("div");
    aiMsg.textContent = `Celestia: ${response}`;
    chatGalaxy.appendChild(aiMsg);

    conversationHistory.push({ user: input, celestia: response });
    document.getElementById("user-input").value = "";
    chatGalaxy.scrollTop = chatGalaxy.scrollHeight;

    if (document.getElementById("voice").checked) {
        speak(response);
    }
}

async function getCelestiaResponse(input) {
    // Dynamic response based on blueprint DNA
    if (input.toLowerCase().includes("rock") || input.toLowerCase().includes("scan")) {
        return celestiaDNA.resourceUtilization(input);
    } else if (input.toLowerCase().includes("alien") || input.toLowerCase().includes("tech")) {
        return celestiaDNA.innovationEngine(input);
    } else if (input.toLowerCase().includes("cosmos") || input.toLowerCase().includes("universe")) {
        return celestiaDNA.universalNexus(input);
    }

    // API Integration for conversational depth
    try {
        const res = await fetch(openSourceAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: input, mode: currentMode })
        });
        const data = await res.json();
        return data.response || "I’m weaving knowledge from the stars—give me a moment.";
    } catch (e) {
        return currentMode === "basic" 
            ? "Greetings, seeker. How may I assist?"
            : `${celestiaDNA.universalNexus(input)} Ask deeper, and I’ll reach further.`;
    }
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.8;
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
}

// Sidebar Features
function newChat() {
    document.getElementById("chat-galaxy").innerHTML = "";
    conversationHistory = [];
}

function toggleSettings() {
    const orbit = document.getElementById("settings-orbit");
    orbit.style.display = orbit.style.display === "block" ? "none" : "block";
}

// Aesthetic Slider (Dynamic UI Adjustment)
document.getElementById("aesthetic").addEventListener("input", (e) => {
    const value = e.target.value;
    document.body.style.filter = `hue-rotate(${value}deg)`;
});
