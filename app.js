// ==========================
// WAKTU INPUT
// ==========================
function getWaktuInput() {

    return new Date().toLocaleString("id-ID", {

        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"

    });

}


// ==========================
// MULAI INPUT STOCK
// ==========================
window.mulaiInput = function () {

    const pic =
        document.getElementById("operator")?.value.trim() || "";

    const kategori =
        document.getElementById("kategori")?.value || "";

    const type =
        document.getElementById("type")?.value || "";

    const tanggal =
        document.getElementById("tanggal")?.value || "";


    // ==========================
    // VALIDASI
    // ==========================
    if (!pic || !kategori || !type || !tanggal) {

        tampilNotif(
            "Lengkapi semua data terlebih dahulu",
            "error"
        );

        return;

    }


    // ==========================
    // DATA AKTIF
    // ==========================
    const activeStock = {

        pic: pic,

        kategori: kategori,

        type: type,

        tanggal: tanggal,

        waktuInput: getWaktuInput()

    };


    // simpan data aktif
    localStorage.setItem(
        "activeStock",
        JSON.stringify(activeStock)
    );


    // backup kompatibilitas
    localStorage.setItem(
        "kategori",
        kategori
    );

    localStorage.setItem(
        "type",
        type
    );

    localStorage.setItem(
        "tanggal",
        tanggal
    );


    console.log("PIC :", pic);
    console.log("Kategori :", kategori);
    console.log("Type :", type);
    console.log("Tanggal :", tanggal);


    // pindah halaman
    window.location.href = "input.html";

};


// ==========================
// NOTIFIKASI
// ==========================
function tampilNotif(
    pesan,
    type = "success"
) {

    const notif =
        document.getElementById("notif");

    if (!notif) {

        alert(pesan);
        return;

    }

    notif.className = "notif";
    notif.classList.add(type);

    notif.innerHTML = pesan;

    notif.style.display = "block";

    setTimeout(() => {

        notif.style.display = "none";

    }, 2000);

}
