var currentProductsArray = [];

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let Prod = currentProductsArray[i];

            htmlContentToAppend += ` 
   <div class="card-group";>
        <div class="card" id="prod-list-container">
          <img class="card-img-top" src="${Prod.imgSrc}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${Prod.name}</h5>
            <p class="card-text">${Prod.description}</p>
            <h3 class="card-number">${Prod.cost} USD </h5>
            <p class="card-text"><small class="text-muted">${Prod.soldCount} vendidos </small></p>
            </div>
        </div>
    </div>
`

            document.getElementById("prod-list-container").innerHTML = (htmlContentToAppend);
        }
    }


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            showProductsList(resultObj.data)
        }
    });
});


