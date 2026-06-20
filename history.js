let historyData =
    JSON.parse(
        localStorage.getItem(
            "historyStock"
        )
    ) || [];

let html = "";

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

        <button
            onclick="bukaData(${index})">

            BUKA DATA

        </button>

    </div>

    <br>

    `;

});

document.getElementById(
    "historyList"
).innerHTML = html;



function bukaData(index){

    localStorage.setItem(

        "selectedHistoryIndex",

        index

    );

    window.location.href =
        "detail_history.html";

}
