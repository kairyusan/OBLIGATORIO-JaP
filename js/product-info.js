let producIn = {}; //DATA DE LOS PRODUCTOS
var prod = {}; //DATA DE LOS PRODUCTOS RELACIONADOS
let producComments = []; //PARA LOS COMENTARIOS


//  PARA MOSTRAR LOS PRODUCTOS
function showProdInfo(prod) {
  let prodcost = `<small class="text-muted"><strong> ${prod.cost} ${prod.currency} </strong></small>`;

  document.getElementById("namae").innerHTML = prod.name;
  document.getElementById("deskuripushon").innerHTML = prod.description;
  document.getElementById("kau").innerHTML = prodcost;

  let htmlContentToAppend = "";

  for (let i = 0; i < prod.images.length; i++) {
    let imageSrc = prod.images[i];
    htmlContentToAppend += `
    <div class="card"> <img class="card-img-top" src="${imageSrc}" alt=""> </div>`;
    document.getElementById("saya").innerHTML = htmlContentToAppend;
  }
}

//  PARA CALIFICAR LOS COMENTARIOS
function calificacion(punt) {
  let estrellas = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= punt) {
      estrellas += `<i class="fas fa-star"></i>`; //  COLOR NEGRO DE PUNTUACIÓN
    } else {
      estrellas += `<i class="far fa-star"></i>`;
    }
  }
  return estrellas;
}

function showProdComments(producComments) {
  let commentsToAppend = "";
  for (let i = 0; i < producComments.length; i++) {
    let comm = producComments[i];
    let drawStars = calificacion(comm.score);
    commentsToAppend +=` 
    <div class="review-block">
      <div class="row">
        <div class="col-sm-3">
          <!-- <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" class="img-rounded"> -->
          <div class="review-block-name"><a href="#">${comm.user}</a></div>
          <div class="review-block-date"> ${comm.dateTime}</div>
        </div>
        <div class="stars"> ${drawStars}</div>
        <div class="review-block-description">${comm.description}</div>
      </div>
    </div>`;
    document.getElementById("commentto").innerHTML = commentsToAppend;
  }
}

function calif(punt){
  
let comm = {}; //Creo una variable de objeto llamada "persona"

let comentt = document.getElementById("comentador").value;
if (comentt.trim() != "") {
  let us = JSON.parse(sessionStorage.getItem("user")); //  PARA TOMAR EL USUARIO
  let fecha = new Date();
  comm.score = punt;
  comm.description = comentt;
  comm.user = us.nombre;
  comm.dateTime = fecha;

  producComments.push(comm);

  showProdComments(producComments);
}else{
  alert("Ingresa un comentario por favor")
};
};











//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      producIn = resultObj.data;
      showProdInfo(producIn);
    }
  });
});

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      producComments = resultObj.data;
      showProdComments(producComments);
    }
  });
});

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
  if (resultObj.status === "ok") {
    var prodd=resultObj.data; //VARIABLE CON EL ARRAY DE PRODUCTOS
    var producRel=producIn.relatedProducts;
    let prodRelAppend="";
    let prodRel=document.getElementById("relationed");

    producRel.forEach(function(e) {
      let pRelacionado=prodd[e];

      prodRelAppend += `<div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${pRelacionado.imgSrc}" onclick="aInfo()">
      <div class="card-body">
        <h5 class="card-number" onclick="aInfo()">${pRelacionado.name}</h5>
        <p class="card-text">${pRelacionado.description}</p>
        <div> <h5>${pRelacionado.cost} USD  </h5>
        <p>${pRelacionado.soldCount} Vendidos </p>
          </div>
        </div>
        
      </div>
    
    
  
   
      `
    });

    prodRel.innerHTML= prodRelAppend;
  };
  },)





});
