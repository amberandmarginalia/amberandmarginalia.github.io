const songs = [];
const websiteURL = "https://amberandmarginalia.github.io/";

function addSong() {
    const title = document.getElementById('songTitle').value.trim();
    const length = document.getElementById('songLength').value.trim();
    const name = document.getElementById('userName').value.trim() || "Anonymous";
    const subtitleText = document.getElementById('subtitle').value.trim();

    if (!title || !length) return alert("Please enter both title and length!");

    songs.push({ title, length });
    renderReceipt(name, subtitleText);

    document.getElementById('songTitle').value = "";
    document.getElementById('songLength').value = "";
}

function renderReceipt(userName, subtitleText) {
    const now = new Date();
    const dateStr = now.toLocaleString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
    });

    // Subtitle
    document.getElementById('receiptSubtitle').textContent = subtitleText || "";

    // Header
    document.getElementById('receiptHeader').innerHTML = `
    <p>Customer: ${userName}</p>
    <p>Date: ${dateStr}</p>
    `;

    // Songs
    const listDiv = document.getElementById('songList');
    listDiv.innerHTML = "";
    let totalSeconds = 0;

    songs.forEach((song, i) => {
    listDiv.innerHTML += `
        <div class="song">
        <span>${i+1}</span>
        <span>${song.title}</span>
        <span>${song.length}</span>
        </div>
    `;
    const [m, s] = song.length.split(":").map(Number);
    totalSeconds += (m*60 + (s||0));
    });

    // Summary
    const totalMins = Math.floor(totalSeconds / 60);
    const totalSecs = totalSeconds % 60;
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = `
    <div class="summary-line">
        <span>ITEM COUNT</span>
        <span>${songs.length}</span>
    </div>
    <div class="summary-line">
        <span>TOTAL TIME</span>
        <span>${totalMins}:${totalSecs.toString().padStart(2,'0')}</span>
    </div>
    `;

    // Footer card info
    const year = now.getFullYear();
    const footerDiv = document.getElementById('footer');
    footerDiv.innerHTML = `
    <p>CARD: **** **** **** ${year}</p>
    <p>AUTHCODE: 1132518</p>
    <p>CARDHOLDER: ${userName}</p>
    <div class="dotted-line"></div>
    <p class="centered">Thank you for listening!</p>
    `;

    // Barcode
    JsBarcode("#barcode", websiteURL, {
    format: "CODE128",
    displayValue: false,
    lineColor: "#000",
    width: 1.5,
    height: 60,
    margin: 0
    });

    // Website link centered under barcode
    const linkEl = document.getElementById('weblink');
    linkEl.textContent = websiteURL;
}

function downloadReceipt() {
    const receipt = document.getElementById("receipt");
    html2canvas(receipt, { scale: 2 }).then(canvas => {
    const link = document.createElement("a");
    link.download = "amberrecordsreceipt.png";
    link.href = canvas.toDataURL();
    link.click();
    });
}