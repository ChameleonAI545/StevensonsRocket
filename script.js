const navHamburger = document.querySelector('.nav__hamburger');
const navMenu = document.querySelector('.nav__menu');

navHamburger.addEventListener('click', () => {
    navHamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Get user's geolocation
function getGeolocation() {
    const liveLocElement = document.getElementById("live-loc");
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                liveLocElement.textContent = `GEO LOC: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            },
            (error) => {
                liveLocElement.textContent = `GEO LOC: [ACCESS DENIED]`;
                console.log("Geolocation error:", error);
            }
        );
    } else {
        liveLocElement.textContent = `GEO LOC: [UNAVAILABLE]`;
    }
}

// Call geolocation on page load
getGeolocation();

const systemStream = document.getElementById("system-input");
const streamingStatus = document.getElementById("streaming-status");
const missionTextTerminal = document.querySelector(".mission-text-terminal");

const terminalOutput = document.querySelector('.terminal-output');
const terminalInput = {
    "mission": "Build the world’s most effective maternal and newborn healthcare system",
    "target": "Save 1 million lives in 20 years",
    "standard": "Deliver SDG-level care for under $400 per pregnancy",
    "design": `Design from first principles\nBuild in the real world.\nLearn continuously.`, 
    "build": `<span class="t-bold t-cyan">LEARN</span>
<span class="t-indent">• Identify and synthesise global best practice</span>
<span class="t-bold t-cyan">CONNECT</span>
<span class="t-indent">• Grow a high-performing learning community</span>
<span class="t-bold t-cyan">DESIGN</span>
<span class="t-indent">• Build the clinical, digital, and organisational infrastructure</span>
<span class="t-bold t-cyan">RESOURCE</span>
<span class="t-indent">• Mobilise capital, talent, and partnerships</span>
<span class="t-bold t-cyan">IMPLEMENT</span>
<span class="t-indent">• Deploy in real-world settings</span>
<span class="t-bold t-cyan">IMPROVE</span>
<span class="t-indent">• Measure, learn, and iterate continuously</span>`
};
const headers = document.querySelectorAll('.db-title');
let contiueTyping = true;

const cursor = document.querySelector('.cursor');



headers.forEach(handleTyping)

function handleTyping(header) {
    let typedText = terminalInput[header.innerHTML.toLowerCase()];
    let timer = null;
    let i = 0;
    let headerKey = header.innerHTML.toLowerCase();
    let lines = typedText.split('\n');

    function type() {
        if (i < lines.length) {
            const line = lines[i];
            
            // Logic to prevent <br> on the final line
            const isLastLine = (i === lines.length - 1);
            const lineBreak = isLastLine ? "" : "<br>";

            if (line.trim().length > 0) {
                terminalOutput.innerHTML += line + lineBreak;
            } else {
                terminalOutput.innerHTML += "<br>";
            }
            
            i++;

            // Speed logic - use consistent delay for all keys
            const speed = 30;
            timer = setTimeout(type, speed);

            // Optional: Keep scrolling to bottom AS it types
            // terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
        } else {
            cursor.classList.add("blinking");
        }
    }

    header.addEventListener("mouseover", () => {
        i = 0;
        terminalOutput.innerHTML = "";
        clearTimeout(timer);
        
        // --- FIX 1: Reset scroll to top when hover begins ---
        terminalOutput.parentElement.scrollTop = 0;

        streamingStatus.classList.add("streaming");
        systemStream.classList.add("streaming");
        missionTextTerminal.style.borderColor = "rgb(0, 217, 255)";
        systemStream.innerHTML = `[RECEIVING ${header.innerHTML.toUpperCase()} DATA]`;
        cursor.classList.remove("blinking");
        
        type();
    });

    header.addEventListener("mouseout", () => {
        clearTimeout(timer);
        streamingStatus.classList.remove("streaming");
        systemStream.classList.remove("streaming");
        missionTextTerminal.style.borderColor = "#1E293B";
        cursor.classList.add("blinking");
    });
}


