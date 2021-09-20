let producact = {};
let produccomments = [];

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      producact = resultObj.data;
      showProdInfo(producact);
    }
  });
});

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      produccomments = resultObj.data;
      showProdComments(produccomments);
    }
  });
});

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

function showProdComments(comments) {
  let commentsToAppend = "";
  for (let i = 0; i < comments.length; i++) {
    let comm = comments[i];
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


//  PARA MOSTRAR EL COMENTARIO QUE YO REALIZO
function califikeishon() {
  let produccomments = [];
  let comentario = {};

  let comentt = document.getElementById("comentador").value;
  if (comentt.trim() != "") {
    let us = JSON.parse(sessionStorage.getItem("user")); //  PARA TOMAR EL USUARIO
    let fecha = new Date();

    comentario.score = valor;
    comentario.description = comentt;
    comentario.user = us.nombre;
    comentario.dateTime = fecha;

    produccomments.push(comentario);

    console.log(produccomments);

    emptyComentt();

    showProdComments(produccomments);
  }
}


//  PARA VACIAR EL CAMPO DE TEXTO Y VACIAR LAS ESTRELLAS EN CUESTIÓN
function emptyComentt() {
  document.getElementById("comentador").value = "";
  document.getElementById("rate-5").checked=false;
  document.getElementById("rate-4").checked=false;
  document.getElementById("rate-3").checked=false;
  document.getElementById("rate-2").checked=false;
  document.getElementById("rate-1").checked=false;
}
