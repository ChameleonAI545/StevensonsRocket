const navHamburger = document.querySelector('.nav__hamburger');
const navMenu = document.querySelector('.nav__menu');

navHamburger.addEventListener('click', () => {
    navHamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

const systemStream = document.getElementById("system-input");
const streamingStatus = document.getElementById("streaming-status");
const missionTextTerminal = document.querySelector(".mission-text-terminal");

const terminalOutput = document.querySelector('.terminal-output');
const terminalInput = {"mission": "maximise access to high quality maternal and newborn care",
                        "goal": "SDG-level care costing less than  $400.00 a pregnancy",
                        "design": "Starting from a blank slate. Design, test, and refine the optimal care model, built as an AI native, data driven Learning Health System",
                        "scale": "Designing in a modular way, to serve populations of 1-3 million people/nWorking in private, public or hybrid systems"};
const headers = document.querySelectorAll('.db-title');
let contiueTyping = true;

const cursor = document.querySelector('.cursor');



headers.forEach(handleTyping)

function handleTyping(header)
{
    
    let typedText = terminalInput[header.innerHTML.toLowerCase()];
    let timer = null;
    let i = 0;

    function type()
    {
        if(i < typedText.length)
        {
            terminalOutput.innerHTML = terminalOutput.innerHTML + typedText.charAt(i);
            i++

            const speed = Math.floor(Math.random() * 50);
            timer = setTimeout(type, speed);
        }
        else{
            cursor.classList.add("blinking");
        }
    }

    header.addEventListener("mouseover", () => {/*terminalOutput.innerHTML = terminalInput[header.innerHTML.toLowerCase()]*/
       i = 0;
       terminalOutput.innerHTML = "";
        clearTimeout(timer);
        type();
        streamingStatus.classList.add("streaming");
        systemStream.classList.add("streaming");
        missionTextTerminal.style.borderColor = "rgb(0, 217, 255)";
        systemStream.innerHTML = `[RECEIVING ${header.innerHTML.toUpperCase()} DATA]`;
        cursor.classList.remove("blinking");

    });

    header.addEventListener("mouseout", () => {
        clearTimeout(timer);
        terminalOutput.innerHTML = "";
        streamingStatus.classList.remove("streaming");
        systemStream.classList.remove("streaming");
        missionTextTerminal.style.borderColor = "#1E293B";
        cursor.classList.add("blinking");
});
}

const aimText = document.querySelector('.aim');
const target = 1000000;

const startCounter = () => {
    let count = 0;
    const duration = 2000; // 2 seconds to reach a million
    const frameRate = 1000 / 60;
    const totalFrames = duration / frameRate;
    const increment = target / totalFrames;

    const counter = setInterval(() => {
        count += increment;
        
        if (count >= target) {
            count = target;
            clearInterval(counter);
        }

        // Format: force 7 digits, then add commas
        // "1" becomes "0000001", then "0,000,001"
        const formatted = Math.floor(count)
            .toString()
            .padStart(7, '0')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        aimText.innerHTML = `We aim to save <strong class="count">${formatted}</strong> lives within 20 years.`;
    }, frameRate);
};

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCounter();
        observer.unobserve(aimText);
    }
}, { threshold: 0.5 });

observer.observe(aimText);

