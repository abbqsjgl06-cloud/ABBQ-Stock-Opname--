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

    const pic =
        document.getElementById("operator").value.trim();

    const kategori =
        document.getElementById("kategori").value;

    const type =
        document.getElementById("type").value;

    const tanggal =
        document.getElementById("tanggal").value;


    if (!pic || !kategori || !type || !tanggal) {

        alert(
            "Lengkapi semua data terlebih dahulu"
        );

        return;

    }


    const waktuInput = getWaktuInput();


    // simpan data aktif
    const activeStock = {

        pic: pic,
        kategori: kategori,
        type: type,
        tanggal: tanggal,
        waktuInput: waktuInput

    };


    localStorage.setItem(
        "activeStock",
        JSON.stringify(activeStock)
    );


    // dipakai input.js
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


    window.location.href = "input.html";

};
