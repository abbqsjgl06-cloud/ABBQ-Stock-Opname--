let kategori = localStorage.getItem("kategori");
let type = localStorage.getItem("type");
let tanggal = localStorage.getItem("tanggal");

document.getElementById("judulHalaman").innerHTML =
kategori + " - " + type + "<br>" + tanggal;

let databaseFile = "";

if(kategori==="Kitchen" && type==="Daily"){
    databaseFile="database/daily_kitchen.json";
}

if(kategori==="Frontliner" && type==="Daily"){
    databaseFile="database/daily_frontliner.json";
}

if(kategori==="Kitchen" && type==="WM"){
    databaseFile="database/wm_kitchen.json";
}

if(kategori==="Frontliner" && type==="WM"){
    databaseFile="database/wm_frontliner.json";
}

fetch(databaseFile)
.then(response => response.json())
.then(data => {

    let html="";

    data.forEach((item,index)=>{

        html += `
        <tr>

            <td>${item.nama_item}</td>

            <td>
                <input
                    type="number"
                    class="qty-input"
                    id="cs_${index}"
                    min="0"
                    value="0">
            </td>

            <td>
                <input
                    type="number"
                    class="qty-input"
                    id="pcs_${index}"
                    min="0"
                    value="0">
            </td>

        </tr>
        `;

    });

    document.getElementById("tableBody").innerHTML = html;

});