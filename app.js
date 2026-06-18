document.getElementById("tanggal").valueAsDate = new Date();

function mulaiInput(){

    localStorage.setItem(
        "kategori",
        document.getElementById("kategori").value
    );

    localStorage.setItem(
        "type",
        document.getElementById("type").value
    );

    localStorage.setItem(
        "tanggal",
        document.getElementById("tanggal").value
    );

    window.location.href="input.html";

}