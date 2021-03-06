var currentProductsArray = [];
const ORDER_ASC_BY_PREC = "09";
const ORDER_DESC_BY_PREC = "90";
const ORDER_BY_PROD_SOLD = "Relev.";
var currentSortCriteria = undefined;
var minPrec = undefined;
var maxPrec = undefined;


function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PREC) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) { return -1; }
      if (a.cost > b.cost) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PREC) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) { return -1; }
      if (a.cost < b.cost) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_SOLD) {
    result = array.sort(function (a, b) {
      let aPrec = parseInt(a.soldCount);
      let bPrec = parseInt(b.soldCount);

      if (aPrec > bPrec) { return -1; }
      if (aPrec < bPrec) { return 1; }
      return 0;
    });
  }

  return result;
}




function showProductsList(currentProductsArray) {

  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let Prod = currentProductsArray[i];

    if (((minPrec == undefined) || (minPrec != undefined && parseInt(Prod.cost) >= minPrec)) &&
      ((maxPrec == undefined) || (maxPrec != undefined && parseInt(Prod.cost) <= maxPrec))) {


      htmlContentToAppend +=

        ` <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="${Prod.imgSrc}" onclick="aInfo()">
                <div class="card-body">
                  <h5 class="card-number" onclick="aInfo()">${Prod.name}</h5>
                  <p class="card-text">${Prod.description}</p>
                  <div> <h5>${Prod.cost} USD  </h5>
                  <p>${Prod.soldCount} Vendidos </p>
                    </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">Comprar</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">A??adir al carrito</button>
                    </div>
                    
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
  }
}

function sortAndShowProducts(sortCriteria, productsArray){
  currentSortCriteria = sortCriteria;

  if(productsArray != undefined){
      currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

  //Muestro las categor??as ordenadas
  showProductsList(currentProductsArray);
}

var filt=[];

  function filtrado() {
    var tex=document.getElementById("sagashisa").value;
    var filt = currentProductsArray.filter(function(productos){
      return productos.name.toLowerCase().indexOf(tex.toLowerCase()) > -1;
    })
    showProductsList(filt);
  }



document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data;
      sortAndShowProducts(ORDER_ASC_BY_PREC, resultObj.data);      
    }
  });
  document.getElementById("sagashisa").addEventListener('keyup', (event) =>{
    filtrado();
  });
});

document.getElementById("sortAsc").addEventListener("click", function(){
  sortAndShowProducts(ORDER_ASC_BY_PREC);
});

document.getElementById("sortDesc").addEventListener("click", function(){
  sortAndShowProducts(ORDER_DESC_BY_PREC);
});

document.getElementById("sortBySold").addEventListener("click", function(){
  sortAndShowProducts(ORDER_BY_PROD_SOLD);
});

document.getElementById("clearRangeFilterCost").addEventListener("click", function(){
  document.getElementById("rangeFilterCostMin").value = "";
  document.getElementById("rangeFilterCostMax").value = "";

  minPrec = undefined;
  maxPrec = undefined;

  showProductsList(currentProductsArray);
});

document.getElementById("rangeFilterCost").addEventListener("click", function(){
  //Obtengo el m??nimo y m??ximo de los intervalos para filtrar por cantidad
  //de productos por categor??a.
  minPrec = document.getElementById("rangeFilterCostMin").value;
  maxPrec = document.getElementById("rangeFilterCostMax").value;

  if ((minPrec != undefined) && (minPrec != "") && (parseInt(minPrec)) >= 0){
      minPrec = parseInt(minPrec);
  }
  else{
      minPrec = undefined;
  }

  if ((maxPrec != undefined) && (maxPrec != "") && (parseInt(maxPrec)) >= 0){
      maxPrec = parseInt(maxPrec);
  }
  else{
      maxPrec = undefined;
  }

  showProductsList(currentProductsArray);
});


function aInfo(){
  location.href = "product-info.html";
}
