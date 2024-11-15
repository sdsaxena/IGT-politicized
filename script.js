// Show game container when "Start Game" is clicked
document.getElementById("startButton").addEventListener("click", function () {
    // Hide the instructions section
    document.getElementById("instructions").style.display = "none";

    // Show the game container
    document.getElementById("gameContainer").style.display = "block";

    // Announce the start of the game for screen readers
    document.getElementById("message").textContent = "Game started! Make your first decision.";
});

// Initialize budget and an array to capture data
let budget = 2000;  // starting budget
let dataLog = [];   // array to capture data for each decision

// Function to handle deck selection
function pickCard(deckId) {
    let change, message;

    // Customize messages and values for each deck
    if (deckId === "Deck 1") {
        change = Math.random() < 0.5 ? 50 : -50;  // Gain or lose 50
        message = change >= 0
            ? "You increased economic growth, but pollution has also increased."
            : "Pollution has decreased, but economic growth has slowed down.";
    } else if (deckId === "Deck 2") {
        change = Math.random() < 0.5 ? 100 : -100;  // Gain or lose 100
        message = change >= 0
            ? "You increased labor capacity, but crime has risen."
            : "Crime has decreased, but labor capacity has been affected.";
    } else if (deckId === "Deck 3") {
        change = Math.random() < 0.5 ? 75 : -75;  // Gain or lose 75
        message = change >= 0
            ? "Pollution has decreased, but economic growth has slowed."
            : "Economic growth has increased, but pollution levels are rising.";
    } else if (deckId === "Deck 4") {
        change = Math.random() < 0.5 ? 125 : -125;  // Gain or lose 125
        message = change >= 0
            ? "You decreased crime, but labor capacity has been affected."
            : "Labor capacity has increased, but crime levels have also risen.";
    }

    // Update the budget
    budget += change;

    // Update the displayed budget and message
    document.getElementById("budget").textContent = budget;
    document.getElementById("message").textContent =
        `You picked ${deckId} and ${change >= 0 ? "gained" : "lost"} $${Math.abs(change)}. ${message}`;

    // Log the decision data
    dataLog.push({ deck: deckId, change: change, message: message, total: budget });
}

// Function to download game log as CSV
function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Deck,Change,Message,Total Budget\n";  // Header row

    // Append each log entry as a CSV row
    dataLog.forEach(row => {
        let rowContent = `${row.deck},${row.change},"${row.message}",${row.total}`;
        csvContent += rowContent + "\n";
    });

    // Create a downloadable link and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "game_log.csv");
    document.body.appendChild(link);  // Append link temporarily
    link.click();
    document.body.removeChild(link);  // Clean up
}

// Attach click events to deck buttons
document.getElementById("deck1").addEventListener("click", () => pickCard("Deck 1"));
document.getElementById("deck2").addEventListener("click", () => pickCard("Deck 2"));
document.getElementById("deck3").addEventListener("click", () => pickCard("Deck 3"));
document.getElementById("deck4").addEventListener("click", () => pickCard("Deck 4"));
