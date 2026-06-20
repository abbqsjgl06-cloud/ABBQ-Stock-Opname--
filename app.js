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

    const pic = document.getElementById("operator")?.value?.trim() || "";
    const kategori = document.getElementById("kategori")?.value || "";
    const type = document.getElementById("type")?.value || "";
    const tanggal = document.getElementById("tanggal")?.value || "";

    // wajib isi
    if (!pic || !kategori || !type || !tanggal) {
        return;
    }

    const waktuInput = getWaktuInput();

    let historyStock = JSON.parse(localStorage.getItem("historyStock")) || [];

    historyStock.push({
        id: Date.now(),
        pic: pic,
        kategori: kategori,
        type: type,
        tanggal: tanggal,
        waktuInput: waktuInput,
        items: []
    });

    localStorage.setItem("historyStock", JSON.stringify(historyStock));

    localStorage.setItem("activeStock", JSON.stringify({
        pic,
        kategori,
        type,
        tanggal,
        waktuInput
    }));

    window.location.href = "input.html";
};
