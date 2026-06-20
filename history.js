let historyData = JSON.parse(
    localStorage.getItem(
        "historyStock"
    )
) || [];

let html = "";


if(historyData.length === 0){

    html = `

    <div class="history-card">

        <h3>
            Belum ada data
        </h3>

        <p>
            Silakan lakukan stock opname terlebih dahulu.
        </p>

    </div>

    `;

}
else{

    historyData.forEach((data,index)=>{

        html += `

        <div class="history-card">

            <h3>

                ${data.kategori}

                -

                ${data.type}

            </h3>

            <p>

                Tanggal :
                ${data.tanggal}

            </p>

            <p>

                Jumlah Item :
                ${data.items.length}

            </p>

            <button
                onclick="bukaData(${index})">

                BUKA DATA

            </button>

        </div>

        <br>

        `;

    });

}


document.getElementById(
    "historyList"
).innerHTML = html;



function bukaData(index){

    let historyData = JSON.parse(

        localStorage.getItem(
            "historyStock"
        )

    ) || [];

    localStorage.setItem(

        "selectedHistory",

        JSON.stringify(
            historyData[index]
        )

    );

    window.location.href =
        "detail_history.html";

}
