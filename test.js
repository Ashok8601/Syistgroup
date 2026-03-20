const wordsDB = {
    easy: ["apple", "beach", "cloud", "dance", "earth", "fruit", "green", "happy", "light", "music", "night", "ocean", "plant", "river", "smile", "table", "water", "young"],
    medium: ["adventure", "beautiful", "challenge", "different", "education", "frequency", "generator", "happiness", "important", "knowledge", "listening", "mountain"],
    hard: ["architecture", "bibliography", "connoisseur", "determination", "enthusiastic", "fluorescence", "hierarchical", "idiosyncrasy", "jurisdiction", "labyrinthine"]
};

let words = [], index = 0, timer = null, timeLeft = 30;
let isRunning = false, correctChars = 0, mistakes = 0;
let chart;

const display = document.getElementById("word-display");
const input = document.getElementById("input-field");
const resetBtn = document.getElementById("reset-btn");

function loadWords() {
    const diff = document.getElementById("diff-level").value;
    display.innerHTML = "";
    words = [];
    
    // Shuffle and load 100 words
    for (let i = 0; i < 100; i++) {
        let w = wordsDB[diff][Math.floor(Math.random() * wordsDB[diff].length)];
        words.push(w);
        let span = document.createElement("span");
        span.innerText = w;
        span.classList.add("word");
        display.appendChild(span);
    }
    highlight();
}

function highlight() {
    const spans = document.querySelectorAll(".word");
    spans.forEach(s => s.classList.remove("active"));
    const activeSpan = spans[index];
    if (activeSpan) {
        activeSpan.classList.add("active");
        // Scroll Logic: Center the active word
        display.scrollTo({
            top: activeSpan.offsetTop - 40,
            behavior: 'smooth'
        });
    }
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timeLeft = parseInt(document.getElementById("time-limit").value);
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        updateLiveWPM(); // Live WPM update

        if (timeLeft <= 0) {
            clearInterval(timer);
            finishTest();
        }
    }, 1000);
}

function updateLiveWPM() {
    let initialTime = parseInt(document.getElementById("time-limit").value);
    let timeElapsed = (initialTime - timeLeft) / 60;
    if (timeElapsed > 0) {
        let wpm = Math.round((correctChars / 5) / timeElapsed);
        document.getElementById("wpm").innerText = wpm;
    }
}

input.addEventListener("input", (e) => {
    if (!isRunning) startTimer();

    const spans = document.querySelectorAll(".word");
    const typedVal = input.value;

    // Word completed
    if (typedVal.endsWith(" ")) {
        let wordTyped = typedVal.trim();
        if (wordTyped === words[index]) {
            spans[index].classList.add("correct");
            correctChars += words[index].length;
        } else {
            spans[index].classList.add("wrong");
            mistakes++;
        }
        index++;
        input.value = "";
        highlight();
        
        // Final Accuracy calculation
        let acc = Math.round(((index - mistakes) / index) * 100);
        document.getElementById("accuracy").innerText = isNaN(acc) ? 100 : acc;
    }
});

function finishTest() {
    input.disabled = true;
    const finalWPM = document.getElementById("wpm").innerText;
    const finalAcc = document.getElementById("accuracy").innerText;
    saveToHistory(finalWPM, finalAcc);
    alert(`Test Complete!\nWPM: ${finalWPM}\nAccuracy: ${finalAcc}%`);
}

function saveToHistory(wpm, acc) {
    let history = JSON.parse(localStorage.getItem("typeHistory") || "[]");
    history.push({ wpm: parseInt(wpm), acc: parseInt(acc), date: new Date().toLocaleTimeString() });
    if (history.length > 10) history.shift();
    localStorage.setItem("typeHistory", JSON.stringify(history));
    updateChart();
}

function initChart() {
    const ctx = document.getElementById("performanceChart").getContext("2d");
    let history = JSON.parse(localStorage.getItem("typeHistory") || "[]");

    // Agar data nahi hai, toh empty placeholder dikhayein
    const labels = history.length > 0 ? history.map(h => h.date) : ["Test 1"];
    const data = history.length > 0 ? history.map(h => h.wpm) : [0];

    chart = new Chart(ctx, {
        type: 'bar', // 'bar' type confirm kiya
        data: {
            labels: labels,
            datasets: [{
                label: 'Words Per Minute (WPM)',
                data: data,
                backgroundColor: '#2563eb', // Solid Blue Bars
                borderRadius: 5,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'WPM' }
                }
            },
            plugins: {
                legend: { display: true, position: 'top' }
            }
        }
    });
}

function saveToHistory(wpm, acc) {
    let history = JSON.parse(localStorage.getItem("typeHistory") || "[]");
    
    // Naya record add karein
    history.push({ 
        wpm: parseInt(wpm), 
        acc: parseInt(acc), 
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    });

    // Sirf last 10 records rakhein
    if (history.length > 10) history.shift();
    
    localStorage.setItem("typeHistory", JSON.stringify(history));

    // Chart Update Logic
    if (chart) {
        chart.data.labels = history.map(h => h.date);
        chart.data.datasets[0].data = history.map(h => h.wpm);
        chart.update();
    }
}

function updateChart() {
    let history = JSON.parse(localStorage.getItem("typeHistory") || "[]");
    chart.data.labels = history.map(h => h.date);
    chart.data.datasets[0].data = history.map(h => h.wpm);
    chart.update();
}

function resetTest() {
    clearInterval(timer);
    isRunning = false;
    index = 0;
    correctChars = 0;
    mistakes = 0;
    timeLeft = 30;
    input.value = "";
    input.disabled = false;
    document.getElementById("timer").innerText = timeLeft;
    document.getElementById("wpm").innerText = "0";
    document.getElementById("accuracy").innerText = "100";
    loadWords();
}

resetBtn.addEventListener("click", resetTest);
document.getElementById("time-limit").addEventListener("change", resetTest);
document.getElementById("diff-level").addEventListener("change", resetTest);

window.onload = () => {
    loadWords();
    initChart();
};
