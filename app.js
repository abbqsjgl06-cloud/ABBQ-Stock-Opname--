function getCurrentTime() {
    const now = new Date();

    return now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function getCurrentDateTime() {
    const now = new Date();

    return now.toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

window.mulaiInput = function () {

    const operator = document.getElementById("operator")?.value.trim();
    const kategori = document.getElementById("kategori")?.value;
    const type = document.getElementById("type")?.value;
    const tanggal = document.getElementById("tanggal")?.value;

    // validasi sederhana
    if (!operator || !kategori || !type || !tanggal) {
        return;
    }

    // 🔥 AUTO TIME (TIDAK DIINPUT USER)
    const timeNow = getCurrentTime();
    const fullTimestamp = getCurrentDateTime();

    let historyStock = JSON.parse(localStorage.getItem("historyStock")) || [];

    historyStock.push({
        id: Date.now(),
        operator: operator,          // PIC
        kategori: kategori,
        type: type,
        tanggal: tanggal,
        time: timeNow,                // ⏰ JAM SAJA
        timestamp: fullTimestamp,     // ⏰ FULL DETAIL
        items: []
    });

    localStorage.setItem("historyStock", JSON.stringify(historyStock));

    localStorage.setItem("activeStock", JSON.stringify({
        operator,
        kategori,
        type,
        tanggal,
        time: timeNow,
        timestamp: fullTimestamp
    }));

    window.location.href = "input.html";
};
