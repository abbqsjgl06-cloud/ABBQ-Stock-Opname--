document.addEventListener("DOMContentLoaded", () => {

    // Ambil data history
    const historyData =
        JSON.parse(
            localStorage.getItem("historyStock")
        ) || [];

    let html = "";

    // Jika belum ada data
    if (historyData.length === 0) {

        html = `
            <div class="history-card">
                <h3>Belum ada data</h3>
            </div>
        `;

    }
    else {

        historyData.forEach((item, index) => {

            // Kompatibilitas data lama dan baru
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

            // Ambil waktu lengkap
            const waktuLengkap =
                item.waktuInput ||
                item.timestamp ||
                "-";

            // Tampilkan hanya jam
            let waktu = "-";

            if (waktuLengkap !== "-") {

                const bagian =
                    waktuLengkap.split(",");

                if (bagian.length > 1) {

                    waktu = bagian[1].trim();

                }
                else {

                    waktu = waktuLengkap;

                }

            }

            // Hitung jumlah item
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

                    <button onclick="bukaData(${index})">
                        BUKA DATA
                    </button>

                </div>

                <br>

            `;

        });

    }

    const historyList =
        document.getElementById(
            "historyList"
        );

    if (historyList) {

        historyList.innerHTML = html;

    }

});


// ===================================
// Buka detail history
// ===================================

function bukaData(index) {

    const historyData =
        JSON.parse(
            localStorage.getItem(
                "historyStock"
            )
        ) || [];

    if (!historyData[index]) {

        return;

    }

    localStorage.setItem(

        "selectedHistory",

        JSON.stringify(
            historyData[index]
        )

    );

    window.location.href =
        "detail_history.html";

}
