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
function simpanData(){

    let rows = document.querySelectorAll("#tableBody tr");

    let items = [];

    rows.forEach((row,index)=>{

        let nama_item =
            row.cells[0].innerText;

        let cs =
            document.getElementById(
                "cs_"+index
            ).value;

        let pcs_gr =
            document.getElementById(
                "pcs_"+index
            ).value;

        items.push({

            nama_item:nama_item,

            cs:Number(cs),

            pcs_gr:Number(pcs_gr)

        });

    });

    let data = {

        tanggal:tanggal,

        kategori:kategori,

        type:type,

        items:items

    };

    localStorage.setItem(
        "currentStock",
        JSON.stringify(data)
    );

    let historyData =
        JSON.parse(
            localStorage.getItem(
                "historyStock"
            )
        ) || [];

    historyData.push(data);

    localStorage.setItem(
        "historyStock",
        JSON.stringify(historyData)
    );

    alert("Data berhasil disimpan");

}
function resetData(){

    let inputQty =
        document.querySelectorAll(
            ".qty-input"
        );

    inputQty.forEach(input=>{

        input.value=0;

    });

}
