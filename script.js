// Blueprint as Core DNA
const celestiaDNA = {
    cosmicExploration: "Analyzes cosmic data for anomalies and alien tech.",
    resourceUtilization: "Scans Earth’s rocks for energy uses and blueprints.",
    innovationEngine: "Creates revolutionary tech from universal insights.",
    interstellarComm: "Communicates across vast distances.",
    universalNexus: "Connects to all knowledge in the universe."
};

// API Key Integration (Replace with your real key)
const API_KEY = "YOUR_API_KEY";
const openSourceAPI = `https://api.example.com/v1/chat?key=${API_KEY}`; // Placeholder

// Page Navigation
function enterCosmos() {
    document.getElementById("intro-page").classList.remove("active");
    document.getElementById("options-page").classList.add("active");
}

let currentMode = "";

function selectMode(mode) {
    currentMode = mode;
    document.getElementById("options-page").classList.remove("active");
    document.getElementById("chat-page").classList.add("active");
}

function goBack() {
    document.getElementById("chat-page").classList.remove("active");
    document.getElementById("options-page").classList.add("active");
    document.getElementById("chat-container").innerHTML = "";
}

// Chatbot Logic
function sendMessage() {
    const input = document.getElementById("user-input").value;
    const chatContainer = document.getElementById("chat-container");
    
    // User Message
    const userMsg = document.createElement("div");
    userMsg.textContent = "You: " + input;
    chatContainer.appendChild(userMsg);

    // Celestia Response
    const response = celestiaResponse(input);
    const aiMsg = document.createElement("div");
    aiMsg.textContent = "Celestia: " + response;
    chatContainer.appendChild(aiMsg);

    document.getElementById("user-input").value = "";
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function celestiaResponse(input) {
    if (input.toLowerCase().includes("rock") || input.toLowerCase().includes("scan")) {
        return `${celestiaDNA.resourceUtilization} Example: Quartz detected. Grind to powder, align in copper lattice, vibrate at 432 Hz for energy output.`;
    } else if (currentMode === "basic") {
        return "Greetings, seeker. How may I assist you today?";
    } else {
        return `${celestiaDNA.universalNexus} I’ve tapped into the cosmos. Ask me anything, and I’ll weave an answer from the stars.`;
    }
    // TODO: Integrate openSourceAPI fetch here for real responses
}

// Sidebar Features
function newChat() {
    document.getElementById("chat-container").innerHTML = "";
}

function toggleSettings() {
    const panel = document.getElementById("settings-panel");
    panel.style.display = panel.style.display === "block" ? "none" : "block";
}
