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
// MULAI INPUT STOCK (FIX TOTAL)
// ==========================
window.mulaiInput = function () {

    const pic = document.getElementById("operator")?.value.trim();
    const kategori = document.getElementById("kategori")?.value;
    const type = document.getElementById("type")?.value;
    const tanggal = document.getElementById("tanggal")?.value;

    // ==========================
    // VALIDASI WAJIB
    // ==========================
    if (!pic || !kategori || !type || !tanggal) {
        tampilNotif("Lengkapi semua data terlebih dahulu", "error");
        return;
    }

    // ==========================
    // DATA AKTIF (STANDAR FIX)
    // ==========================
    const activeStock = {
        pic: pic,
        operator: pic, // 🔥 biar kompatibel dengan history lama
        kategori: kategori,
        type: type,
        tanggal: tanggal,
        waktuInput: getWaktuInput()
    };

    // ==========================
    // SIMPAN LOCALSTORAGE
    // ==========================
    localStorage.setItem("activeStock", JSON.stringify(activeStock));

    // backup lama (biar tidak rusak sistem lama)
    localStorage.setItem("kategori", kategori);
    localStorage.setItem("type", type);
    localStorage.setItem("tanggal", tanggal);

    console.log("ACTIVE STOCK SAVED:", activeStock);

    // ==========================
    // REDIRECT
    // ==========================
    window.location.href = "input.html";
};

// ==========================
// NOTIFIKASI (FIX STABIL)
// ==========================
function tampilNotif(pesan, type = "success") {

    const notif = document.getElementById("notif");

    if (!notif) return;

    notif.className = "notif " + type;
    notif.innerText = pesan;
    notif.style.display = "block";

    setTimeout(() => {
        notif.style.display = "none";
    }, 2000);
}
