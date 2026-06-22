function getWaktuInput() {

    return new Date().toLocaleString(
        "id-ID",
        {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

}

window.mulaiInput = function () {

    const pic =
        document.getElementById("operator").value.trim();

    const kategori =
        document.getElementById("kategori").value;

    const type =
        document.getElementById("type").value;

    const tanggal =
        document.getElementById("tanggal").value;

    if (!pic || !kategori || !type || !tanggal) {

        tampilNotif(
            "Lengkapi semua data terlebih dahulu"
        );

        return;

    }

    const activeStock = {

        pic: pic,

        kategori: kategori,

        type: type,

        tanggal: tanggal,

        waktuInput: getWaktuInput()

    };

    localStorage.setItem(
        "activeStock",
        JSON.stringify(activeStock)
    );

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

    window.location.href =
        "input.html";

};


function tampilNotif(pesan) {

    let notif =
        document.getElementById(
            "notif"
        );

    if (!notif) return;

    notif.innerHTML = pesan;

    notif.style.display =
        "block";

    setTimeout(() => {

        notif.style.display =
            "none";

    }, 2000);

}
