document.addEventListener("DOMContentLoaded", () => {

const historyData =
    JSON.parse(
        localStorage.getItem("historyStock")
    ) || [];

tampilkanHistory(historyData);

});

// =====================================
// Menampilkan history
// =====================================

function tampilkanHistory(historyData) {

let html = "";

if (historyData.length === 0) {

    html = `
    <div class="history-card">
        <h3>Belum ada data</h3>
    </div>
    `;

} else {

    historyData.forEach((item) => {

        const pic =
            item.pic ||
            item.operator ||
            "-";

        const kategori =
            item.kategori ||
            "-";

        const type =
            item.type ||
            "-";

        const tanggal =
            item.tanggal ||
            "-";

        const waktuLengkap =
            item.waktuInput ||
            item.timestamp ||
            "-";

        let waktu = "-";

        if (waktuLengkap !== "-") {

            const bagian =
                waktuLengkap.split(",");

            if (bagian.length > 1) {

                waktu = bagian[1].trim();

            } else {

                waktu = waktuLengkap;

            }

        }

        const jumlah =
            Array.isArray(item.items)
                ? item.items.length
                : 0;

        html += `

        <div class="history-card">

            <h3>
                ${kategori} - ${type}
            </h3>

            <p>
                <b>PIC:</b>
                ${pic}
            </p>

            <p>
                <b>Tanggal:</b>
                ${tanggal}
            </p>

            <p>
                <b>Waktu Input:</b>
                ${waktu}
            </p>

            <p>
                <b>Jumlah Item:</b>
                ${jumlah}
            </p>

            <button onclick="bukaData(${item.id})">
                BUKA DATA
            </button>

        </div>

        <br>

        `;

    });

}

document.getElementById("historyList").innerHTML = html;

}

// =====================================
// Filter tanggal
// =====================================

function filterHistory() {

const startDate =
    document.getElementById("startDate").value;

const endDate =
    document.getElementById("endDate").value;

const historyData =
    JSON.parse(
        localStorage.getItem("historyStock")
    ) || [];

if (!startDate || !endDate) {

    tampilkanHistory(historyData);

    return;

}

const hasilFilter =
    historyData.filter(item => {

        return (
            item.tanggal >= startDate &&
            item.tanggal <= endDate
        );

    });

tampilkanHistory(hasilFilter);

}

// =====================================
// Reset filter
// =====================================

function resetFilter() {

document.getElementById("startDate").value = "";

document.getElementById("endDate").value = "";

const historyData =
    JSON.parse(
        localStorage.getItem("historyStock")
    ) || [];

tampilkanHistory(historyData);

}

// =====================================
// Buka detail history
// =====================================

function bukaData(id) {

const historyData =
    JSON.parse(
        localStorage.getItem("historyStock")
    ) || [];

const selectedData =
    historyData.find(
        item => item.id === id
    );

if (!selectedData) {

    return;

}

localStorage.setItem(

    "selectedHistory",

    JSON.stringify(selectedData)

);

window.location.href =
    "detail_history.html";

}
