document.addEventListener("DOMContentLoaded", () => {

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

    window.mulaiInput = function () {

        const pic = document.getElementById("operator")?.value.trim();
        const kategori = document.getElementById("kategori")?.value;
        const type = document.getElementById("type")?.value;
        const tanggal = document.getElementById("tanggal")?.value;

        if (!pic || !kategori || !type || !tanggal) {
            tampilNotif("Lengkapi semua data", "error");
            return;
        }

        const activeStock = {
            pic,
            kategori,
            type,
            tanggal,
            waktuInput: getWaktuInput()
        };

        localStorage.setItem("activeStock", JSON.stringify(activeStock));

        window.location.href = "input.html";
    };

    window.tampilNotif = function (pesan, type = "success") {
        const notif = document.getElementById("notif");
        if (!notif) return;

        notif.className = "notif " + type;
        notif.innerText = pesan;
        notif.style.display = "block";

        setTimeout(() => notif.style.display = "none", 2000);
    };

});
