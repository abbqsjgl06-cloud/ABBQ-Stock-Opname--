// =====================================
// APP.JS FINAL STABLE
// =====================================

// ======================
// WAKTU INPUT
// ======================
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

// ======================
// MULAI INPUT
// ======================
window.mulaiInput = function () {

    const pic =
        document.getElementById("operator").value.trim();

    const kategori =
        document.getElementById("kategori").value;

    const type =
        document.getElementById("type").value;

    const tanggal =
        document.getElementById("tanggal").value;

    // ======================
    // VALIDASI
    // ======================
    if (!pic || !kategori || !type || !tanggal) {

        tampilNotif(
            "Lengkapi semua data terlebih dahulu",
            "error"
        );

        return;

    }

    // ======================
    // DATA AKTIF
    // ======================
    const activeStock = {

        pic: pic,
        kategori: kategori,
        type: type,
        tanggal: tanggal,
        waktuInput: getWaktuInput()

    };

    // ======================
    // SIMPAN
    // ======================
    localStorage.setItem(
        "activeStock",
        JSON.stringify(activeStock)
    );

    // Backup kompatibilitas
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

    console.log("=== ACTIVE STOCK ===");
    console.log(activeStock);

    // ======================
    // PINDAH HALAMAN
    // ======================
    window.location.href =
        "input.html";

};

// ======================
// NOTIFIKASI
// ======================
function tampilNotif(
    pesan,
    type = "success"
) {

    const notif =
        document.getElementById("notif");

    if (!notif) {

        return;

    }

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

// ======================
// INSTALL PWA
// ======================

let deferredPrompt = null;

window.addEventListener(
    "beforeinstallprompt",
    (e) => {

        e.preventDefault();

        deferredPrompt = e;

        const installBtn =
            document.getElementById(
                "installBtn"
            );

        if (installBtn) {

            installBtn.style.display =
                "block";

        }

    }
);

const installBtn =
    document.getElementById(
        "installBtn"
    );

if (installBtn) {

    installBtn.addEventListener(
        "click",
        async () => {

            if (!deferredPrompt) {

                return;

            }

            deferredPrompt.prompt();

            await deferredPrompt.userChoice;

            deferredPrompt = null;

            installBtn.style.display =
                "none";

        }
    );

}

// ======================
// REGISTER SERVICE WORKER
// ======================
if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker.register(
                "./service-worker.js"
            );

        }
    );

}
