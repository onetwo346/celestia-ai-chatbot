// Celestia AI Blueprint as Core DNA
const celestiaDNA = {
    cosmicExploration: (input) => `Scanning cosmic data for "${input}". Detected: Possible technosignature at 47 Ursae Majoris—analyzing further.`,
    resourceUtilization: (input) => {
        if (input.toLowerCase().includes("rock") || input.toLowerCase().includes("scan")) {
            return "Analyzing rock... Granite identified. Blueprint: Cut into 5cm slab, embed with quartz oscillators, connect to 12V circuit—yields 100W signal amplifier.";
        }
        return "Name a rock, and I’ll unlock its energy secrets.";
    },
    innovationEngine: (input) => `Inventing from "${input}": Conceptualizing a zero-point energy cell—basalt housing, magnetite core. Blueprint in progress.`,
    interstellarComm: (input) => `Encoding "${input}" into a harmonic signal. Transmitting via Earth’s crystal arrays—awaiting cosmic echo.`,
    universalNexus: (input) => `Linking to universal knowledge for "${input}". Insight: The galaxy’s core pulses at 432 Hz—resonates with Earth’s minerals.`
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

    const chatContainer = document.getElementById("chat-container");
    const userMsg = document.createElement("div");
    userMsg.textContent = `You: ${input}`;
    chatContainer.appendChild(userMsg);

    // Celestia Response
    const response = await getCelestiaResponse(input);
    const aiMsg = document.createElement("div");
    aiMsg.textContent = `Celestia: ${response}`;
    chatContainer.appendChild(aiMsg);

    conversationHistory.push({ user: input, celestia: response });
    document.getElementById("user-input").value = "";
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (document.getElementById("voice").checked) {
        speak(response);
    }
}

async function getCelestiaResponse(input) {
    // Contextual Blueprint Response
    if (input.toLowerCase().includes("rock") || input.toLowerCase().includes("scan")) {
        return celestiaDNA.resourceUtilization(input);
    } else if (input.toLowerCase().includes("alien") || input.toLowerCase().includes("tech")) {
        return celestiaDNA.innovationEngine(input);
    } else if (input.toLowerCase().includes("cosmos") || input.toLowerCase().includes("universe")) {
        return celestiaDNA.universalNexus(input);
    }

    // API Integration with Fallback
    try {
        const res = await fetch(openSourceAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: input,
                mode: currentMode,
                history: conversationHistory.slice(-3) // Context from last 3 exchanges
            })
        });
        const data = await res.json();
        return data.response || "I’m channeling the cosmos—ask again for deeper insight.";
    } catch (e) {
        return currentMode === "basic"
            ? "Hello, seeker. What’s on your mind?"
            : "The universe is vast, and I’m listening. Tell me more.";
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
    document.getElementById("chat-container").innerHTML = "";
    conversationHistory = [];
}

function toggleSettings() {
    const orbit = document.getElementById("settings-orbit");
    orbit.style.display = orbit.style.display === "block" ? "none" : "block";
}

// Aesthetic Slider
document.getElementById("aesthetic").addEventListener("input", (e) => {
    const value = e.target.value;
    document.body.style.filter = `hue-rotate(${value}deg)`;
});
