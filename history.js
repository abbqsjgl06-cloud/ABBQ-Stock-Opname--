```javascript
// ====================================
// AMBIL SEMUA HISTORY
// ====================================
let allData =
    JSON.parse(
        localStorage.getItem("historyStock")
    ) || [];


// ====================================
// HALAMAN PERTAMA
// ====================================
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById(
        "historyList"
    ).innerHTML =

    `
    <p style="text-align:center;color:gray">

        Silakan pilih tanggal untuk melihat riwayat

    </p>
    `;

});


// ====================================
// TAMPILKAN HISTORY
// ====================================
function renderHistory(data) {

    let html = "";

    if (!data || data.length === 0) {

        html = `

        <div class="history-card">

            <h3>
                Tidak ada data
            </h3>

        </div>

        `;

    }
    else {

        data.forEach(item => {

            // ambil jam saja
            let waktu = "-";

            if (item.waktuInput) {

                const bagian =
                    item.waktuInput.split(",");

                if (bagian.length > 1) {

                    waktu =
                        bagian[1].trim();

                }
                else {

                    waktu =
                        item.waktuInput;

                }

            }

            html += `

            <div class="history-card">

                <h3>

                    ${item.kategori}
                    -
                    ${item.type}

                </h3>

                <p>

                    <b>PIC :</b>

                    ${item.pic || item.operator || "-"}

                </p>

                <p>

                    <b>Tanggal :</b>

                    ${item.tanggal}

                </p>

                <p>

                    <b>Waktu Input :</b>

                    ${waktu}

                </p>

                <p>

                    <b>Jumlah Item :</b>

                    ${item.items?.length || 0}

                </p>

                <button
                    onclick="bukaData(${item.id})">

                    BUKA DATA

                </button>

            </div>

            <br>

            `;

        });

    }

    document.getElementById(
        "historyList"
    ).innerHTML = html;

}


// ====================================
// FILTER HISTORY
// ====================================
function filterHistory() {

    const startDate =
        document.getElementById(
            "startDate"
        ).value;

    const endDate =
        document.getElementById(
            "endDate"
        ).value;

    if (!startDate || !endDate) {

        alert(
            "Pilih tanggal awal dan akhir"
        );

        return;

    }

    const filteredData =
        allData.filter(item => {

            return (

                item.tanggal >= startDate &&

                item.tanggal <= endDate

            );

        });

    renderHistory(
        filteredData
    );

}


// ====================================
// RESET FILTER
// ====================================
function resetFilter() {

    document.getElementById(
        "startDate"
    ).value = "";

    document.getElementById(
        "endDate"
    ).value = "";

    document.getElementById(
        "historyList"
    ).innerHTML =

    `
    <p style="text-align:center;color:gray">

        Silakan pilih tanggal untuk melihat riwayat

    </p>
    `;

}


// ====================================
// BUKA DETAIL
// ====================================
function bukaData(id) {

    const selectedData =
        allData.find(
            item => item.id === id
        );

    if (!selectedData) {

        alert(
            "Data tidak ditemukan"
        );

        return;

    }

    localStorage.setItem(

        "selectedHistory",

        JSON.stringify(
            selectedData
        )

    );

    window.location.href =
        "detail_history.html";

}
```
