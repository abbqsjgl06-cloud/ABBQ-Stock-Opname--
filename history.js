// =====================================
// HISTORY.JS
// ABBQ STOCK OPNAME
// =====================================

let allData = [];

// =====================================
// LOAD DATA
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    allData = JSON.parse(
        localStorage.getItem("historyStock")
    ) || [];

    const historyList =
        document.getElementById("historyList");

    if (historyList) {

        historyList.innerHTML = `
            <div class="history-empty">

                <h3>
                    Pilih tanggal kemudian tekan FILTER
                </h3>

            </div>
        `;

    }

});


// =====================================
// RENDER HISTORY
// =====================================

function renderHistory(data) {

    const historyList =
        document.getElementById("historyList");

    if (!historyList) return;

    if (data.length === 0) {

        historyList.innerHTML = `

            <div class="history-card">

                <h3>
                    Tidak ada data
                </h3>

            </div>

        `;

        return;

    }

    let html = "";

    data.forEach(item => {

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

        const jumlah =
            Array.isArray(item.items)
                ? item.items.length
                : 0;

        // hanya jam
        let jam = "-";

        if (item.waktuInput) {

            const split =
                item.waktuInput.split(",");

            jam =
                split.length > 1
                    ? split[1].trim()
                    : item.waktuInput;

        }

        html += `

            <div class="history-card">

                <h3>
                    ${kategori} - ${type}
                </h3>

                <p>
                    <b>PIC :</b>
                    ${pic}
                </p>

                <p>
                    <b>Tanggal :</b>
                    ${tanggal}
                </p>

                <p>
                    <b>Jam :</b>
                    ${jam}
                </p>

                <p>
                    <b>Jumlah Item :</b>
                    ${jumlah}
                </p>

                <button
                    onclick="bukaData(${item.id})">

                    BUKA DATA

                </button>

            </div>

            <br>

        `;

    });

    historyList.innerHTML = html;

}



// =====================================
// FILTER HISTORY
// =====================================

function filterHistory() {

    const start =
        document.getElementById("startDate").value;

    const end =
        document.getElementById("endDate").value;

    if (!start || !end) {

        tampilNotif(
            "Pilih tanggal terlebih dahulu",
            "error"
        );

        return;

    }

    const hasil = allData.filter(item => {

        return (
            item.tanggal >= start &&
            item.tanggal <= end
        );

    });

    renderHistory(hasil);

}



// =====================================
// RESET
// =====================================

function resetFilter() {

    document.getElementById(
        "startDate"
    ).value = "";

    document.getElementById(
        "endDate"
    ).value = "";

    document.getElementById(
        "historyList"
    ).innerHTML = `

        <div class="history-empty">

            <h3>
                Pilih tanggal kemudian tekan FILTER
            </h3>

        </div>

    `;

}



// =====================================
// BUKA DETAIL
// =====================================

function bukaData(id) {

    const data =
        allData.find(
            item => item.id == id
        );

    if (!data) {

        tampilNotif(
            "Data tidak ditemukan",
            "error"
        );

        return;

    }

    localStorage.setItem(

        "selectedHistory",

        JSON.stringify(data)

    );

    window.location.href =
        "detail_history.html";

}



// =====================================
// NOTIFIKASI
// =====================================

function tampilNotif(
    pesan,
    type = "success"
) {

    const notif =
        document.getElementById("notif");

    if (!notif) return;

    notif.className =
        "notif " + type;

    notif.innerHTML =
        pesan;

    notif.style.display =
        "block";

    setTimeout(() => {

        notif.style.display =
            "none";

    }, 2000);

}
