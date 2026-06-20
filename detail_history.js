let data =
JSON.parse(
    localStorage.getItem(
        "selectedHistory"
    )
);


if(!data){

    window.location.href =
        "history.html";

}


document.getElementById(
    "judulHistory"
).innerHTML =

    data.kategori +
    " - " +
    data.type +
    " - " +
    data.tanggal;



let html = "";


data.items.forEach((item,index)=>{

    html += `

    <tr>

        <td>${item.nomor}</td>

        <td>${item.kode}</td>

        <td>${item.item}</td>

        <td>${item.konv}</td>

        <td>${item.uom}</td>

        <td>

            <input
                type="number"
                class="qty-input"
                id="qty_${index}"
                min="0"
                value="${item.pcs_gr}">

        </td>

    </tr>

    `;

});


document.getElementById(
    "tableBody"
).innerHTML = html;



function updateData(){

    data.items.forEach((item,index)=>{

        item.pcs_gr = Number(

            document.getElementById(
                "qty_"+index
            ).value

        );

    });


    let historyData =

        JSON.parse(
            localStorage.getItem(
                "historyStock"
            )
        ) || [];


    let index = historyData.findIndex(

        x =>

        x.tanggal === data.tanggal &&

        x.kategori === data.kategori &&

        x.type === data.type

    );


    if(index !== -1){

        historyData[index] = data;

    }


    localStorage.setItem(

        "historyStock",

        JSON.stringify(
            historyData
        )

    );


    localStorage.setItem(

        "selectedHistory",

        JSON.stringify(
            data
        )

    );


    tampilNotif(
        "✓ Data berhasil diperbarui"
    );

}



function exportHistoryExcel(){

    let excelData = [];


    data.items.forEach(item=>{

        excelData.push({

            "No": item.nomor,

            "Kode": item.kode,

            "Item": item.item,

            "Konv": item.konv,

            "UOM": item.uom,

            "PCS/Gr": item.pcs_gr

        });

    });


    let wb =
        XLSX.utils.book_new();


    let ws =
        XLSX.utils.json_to_sheet(
            excelData
        );


    XLSX.utils.book_append_sheet(

        wb,

        ws,

        "Stock Opname"

    );


    let namaFile =

        "SO_" +

        data.kategori +

        "_" +

        data.type +

        "_" +

        data.tanggal +

        ".xlsx";


    XLSX.writeFile(

        wb,

        namaFile

    );


    tampilNotif(
        "✓ Excel berhasil dibuat"
    );

}



function tampilNotif(pesan){

    let notif =

        document.getElementById(
            "notif"
        );


    notif.innerHTML = pesan;

    notif.style.display = "block";


    setTimeout(()=>{

        notif.style.display = "none";

    },2000);

}
