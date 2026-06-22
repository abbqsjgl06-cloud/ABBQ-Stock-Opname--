// ==========================
// WAKTU
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

    const pic = document.getElementById("operator")?.value.trim();
    const kategori = document.getElementById("kategori")?.value;
    const type = document.getElementById("type")?.value;
    const tanggal = document.getElementById("tanggal")?.value;

    // VALIDASI
    if (!pic || !kategori || !type || !tanggal) {
        tampilNotif("Lengkapi semua data terlebih dahulu", "error");
        return;
    }

    // ==========================
    // SIMPAN DATA UTAMA (WAJIB)
    // ==========================
    const activeStock = {
        pic,
        kategori,
        type,
        tanggal,
        waktuInput: getWaktuInput()
    };

    localStorage.setItem("activeStock", JSON.stringify(activeStock));

    // BACKUP (biar kompatibel dengan kode lama kamu)
    localStorage.setItem("kategori", kategori);
    localStorage.setItem("type", type);
    localStorage.setItem("tanggal", tanggal);

    // pindah halaman
    window.location.href = "input.html";
};


// ==========================
// NOTIFIKASI
// ==========================
function tampilNotif(pesan, type = "success") {

    let notif = document.getElementById("notif");
    if (!notif) return;

    notif.className = "notif";
    notif.classList.add(type);

    notif.innerHTML = pesan;
    notif.style.display = "block";

    setTimeout(() => {
        notif.style.display = "none";
    }, 2000);
}
