let historyData = JSON.parse(
    localStorage.getItem("historyStock")
) || [];

let html = "";

historyData.forEach((item,index)=>{

    html += `
        <div class="history-card">

            <h3>${item.tanggal}</h3>

            <p>
                ${item.kategori}
                -
                ${item.type}
            </p>

        </div>

        <br>
    `;

});

document.getElementById("historyList").innerHTML = html;