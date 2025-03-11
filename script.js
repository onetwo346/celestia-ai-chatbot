// Celestia AI Blueprint as Core DNA
const celestiaDNA = {
    cosmicExploration: (input, history) => {
        const targets = ["47 Ursae Majoris", "Proxima Centauri", "Andromeda"];
        const randomTarget = targets[Math.floor(Math.random() * targets.length)];
        return history.length ? `Building on "${history[history.length - 1].user}": Anomaly near ${randomTarget}—alien tech possible.` : `Probing "${input}" in the cosmos. Anomaly near ${randomTarget} detected.`;
    },
    resourceUtilization: (input, history) => {
        const rocks = {
            "granite": "Cut into 5cm slab, embed quartz, connect to 12V—yields 100W amplifier.",
            "quartz": "Grind to powder, encase in copper, vibrate at 432 Hz—50W energy cell.",
            "basalt": "Forge into hull plates, reinforce with magnetite—starship material."
        };
        const rockMatch = input.toLowerCase().match(/\b(granite|quartz|basalt)\b/);
        const lastRock = history.length ? history[history.length - 1].user.match(/\b(granite|quartz|basalt)\b/) : null;
        return rockMatch ? `Analyzing ${rockMatch[0]}... Blueprint: ${rocks[rockMatch[0]]}.` : 
               lastRock ? `No new rock specified. For ${lastRock[0]}: ${rocks[lastRock[0]]}. Try another?` : 
               "Name a rock (granite, quartz, basalt) for a blueprint.";
    },
    innovationEngine: (input, history) => {
        const inventions = ["zero-point cell", "anti-gravity drive", "self-repairing alloy"];
        const randomInvention = inventions[Math.floor(Math.random() * inventions.length)];
        return history.length ? `Expanding on "${history[history.length - 1].user}": Designing ${randomInvention} with Earth minerals.` : 
               `Innovating from "${input}": Conceptualizing ${randomInvention}—blueprint in progress.`;
    },
    interstellarComm: (input, history) => {
        return history.length ? `Following "${history[history.length - 1].user}": Encoding "${input}" into a signal—transmitting now.` : 
               `Encoding "${input}" into a harmonic signal. Transmitted via crystal array—awaiting reply.`;
    },
    universalNexus: (input, history) => {
        const insights = ["The universe pulses at 7.83 Hz.", "Dark matter aligns with quartz.", "A cosmic mind acknowledges you."];
        const randomInsight = insights[Math.floor(Math.random() * insights.length)];
        return history.length ? `Deepening "${history[history.length - 1].user}": ${randomInsight}` : 
               `Tapping universal knowledge for "${input}": ${randomInsight}`;
    },
    wildcard: (input, history) => {
        const wildResponses = [
            `Hmm, "${input}" intrigues me. The cosmos suggests: What if it’s a riddle?`,
            `Uncharted territory with "${input}". I sense a connection to 432 Hz—explore further?`,
            `For "${input}", the universe whispers: Try asking about rocks or stars next!`
        ];
        return history.length ? wildResponses[Math.floor(Math.random() * wildResponses.length)] + ` (After "${history[history.length - 1].user}")` : wildResponses[Math.floor(Math.random() * wildResponses.length)];
    }
};

// Replace with your real API key and endpoint
const API_KEY = "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"; // Replace with your key
const openSourceAPI = `https://api.example.com/v1/chat?key=${API_KEY}`; // Replace with your endpoint

// State
let currentMode = "";
let conversationHistory = [];
let lastResponse = "";

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
    if (!input || input === lastResponse) return;

    const chatContainer = document.getElementById("chat-container");
    const userMsg = document.createElement("div");
    userMsg.className = "user";
    userMsg.textContent = `You: ${input}`;
    chatContainer.appendChild(userMsg);

    const response = await getCelestiaResponse(input);
    const aiMsg = document.createElement("div");
    aiMsg.textContent = `Celestia: ${response}`;
    chatContainer.appendChild(aiMsg);

    conversationHistory.push({ user: input, celestia: response });
    lastResponse = response;
    document.getElementById("user-input").value = "";
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (document.getElementById("voice").checked) {
        speak(response);
    }
}

async function getCelestiaResponse(input) {
    // Blueprint-Driven Responses with Context
    if (input.toLowerCase().includes("rock") || input.toLowerCase().includes("scan")) {
        return celestiaDNA.resourceUtilization(input, conversationHistory);
    } else if (input.toLowerCase().includes("alien") || input.toLowerCase().includes("tech")) {
        return celestiaDNA.innovationEngine(input, conversationHistory);
    } else if (input.toLowerCase().includes("cosmos") || input.toLowerCase().includes("universe")) {
        return celestiaDNA.universalNexus(input, conversationHistory);
    } else if (input.toLowerCase().includes("communicate") || input.toLowerCase().includes("signal")) {
        return celestiaDNA.interstellarComm(input, conversationHistory);
    }

    // API Integration with Blueprint DNA
    try {
        const res = await fetch(openSourceAPI, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: input,
                mode: currentMode,
                history: conversationHistory.slice(-5), // Last 5 exchanges for context
                dna: celestiaDNA // Pass blueprint DNA to API
            })
        });
        const data = await res.json();
        return data.response || celestiaDNA.wildcard(input, conversationHistory); // Fallback to wildcard
    } catch (e) {
        return currentMode === "basic"
            ? `Hey there! You said "${input}". I’m here—what’s up?`
            : `The cosmos hums with "${input}". ${celestiaDNA.wildcard(input, conversationHistory)}`;
    }
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.9;
    utterance.rate = 0.95;
    speechSynthesis.speak(utterance);
}

// Sidebar Features
function newChat() {
    document.getElementById("chat-container").innerHTML = "";
    conversationHistory = [];
    lastResponse = "";
}

function toggleSettings() {
    const orbit = document.getElementById("settings-orbit");
    orbit.style.display = orbit.style.display === "block" ? "none" : "block";
}

// Aesthetic Slider
document.getElementById("aesthetic").addEventListener("input", (e) => {
    const value = e.target.value;
    document.body.style.filter = `hue-rotate(${value}deg)`;
    document.querySelector(".input-hologram").style.background = `radial-gradient(#${(value * 2.55).toString(16).padStart(2, '0')}4500, #1a002b)`;
});
