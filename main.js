const partyAudio = new Audio('assets/grass.mp3');
partyAudio.loop = true;

function makeEverythingGoCrazy() {
    if (window.activePartyStop) return;

    partyAudio.currentTime = 0;
    partyAudio.play().catch(err => console.log("Audio play blocked/errored:", err));

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.id = "party-styles";
    styleSheet.innerText = `
        @keyframes crazyHueRotate {
            0% { filter: hue-rotate(0deg) saturate(3) contrast(150%); }
            50% { filter: hue-rotate(360deg) saturate(5) contrast(200%); }
            100% { filter: hue-rotate(720deg) saturate(3) contrast(150%); }
        }

        @keyframes crazySpin {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(15deg) scale(1.05); }
            50% { transform: rotate(0deg) scale(0.95); }
            75% { transform: rotate(-15deg) scale(1.05); }
            100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes crazyBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .party-mode-active {
            animation: crazyHueRotate 2s infinite linear, crazySpin 4s infinite ease-in-out !important;
        }

        .party-mode-child {
            animation: crazyBounce 0.5s infinite alternate ease-in-out;
        }
    `;
    document.head.appendChild(styleSheet);

    document.body.classList.add("party-mode-active");

    const elements = document.querySelectorAll("div, section, header, footer, h1, h2, h3, p, button, img");
    elements.forEach((el, index) => {
        el.style.animationDelay = `${(index % 5) * 0.1}s`;
        el.classList.add("party-mode-child");
    });

    const partyInterval = setInterval(() => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }, 300);

    window.activePartyStop = function stopParty() {
        partyAudio.pause();
        partyAudio.currentTime = 0;

        clearInterval(partyInterval);
        
        document.body.classList.remove("party-mode-active");
        document.body.style.backgroundColor = "";
        elements.forEach(el => {
            el.classList.remove("party-mode-child");
            el.style.animationDelay = "";
        });
        
        const injectedStyle = document.getElementById("party-styles");
        if (injectedStyle) injectedStyle.remove();
        
        window.activePartyStop = null;
    };
}

makeEverythingGoCrazy();