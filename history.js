// =====================================
// HISTORY.JS FINAL STABLE
// =====================================

let allData = [];

// =====================================
// LOAD
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    allData = JSON.parse(
        localStorage.getItem("historyStock")
    ) || [];

    renderHistory(allData);

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

                    Belum ada data

                </h3>

            </div>

        `;

        return;

    }

    let html = "";

    data.forEach((item) => {

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

        // tampilkan jam saja
        let waktu = "-";

        if (item.waktuInput) {

            const pecah =
                item.waktuInput.split(",");

            waktu =
                pecah.length > 1
                ? pecah[1].trim()
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

                ${waktu}

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
// FILTER
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

    renderHistory(allData);

}

// =====================================
// DETAIL
// =====================================

function bukaData(id) {

    const data = allData.find(
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
// NOTIF
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
