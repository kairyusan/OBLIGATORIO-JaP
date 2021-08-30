

function ingreso(user, pass) {
  let usu = {};

  if (user.trim() === "" || pass.trim() === "") {

    alert("Ingrese datos correctos");

  } else {
    usu.nombre = user;
    usu.estado = "conectado";
    usu.contraseña = pass;
    localStorage.setItem('user', JSON.stringify(usu));
    sessionStorage.setItem('user', JSON.stringify(usu));
    location.href = "inicio.html";
    alert(" Bienvenido Usuario : " + user);

  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  let usu = JSON.parse(localStorage.getItem('user'));
  document.getElementById("welcome").innerHTML = usu.nombre;
});


function laproximasale() {
  alert("Anota el pass en papel para la próxima");


}

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);

  let google = {};
  google.nombre = profile.getName();

  localStorage.setItem("user", JSON.stringify(google));
  location.href = "inicio.html";


}
function desconectate() {
  localStorage.clear();
  sessionStorage.clear();
  location.href = "index.html";
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    location.href="index.html";
  });
  var revokeAllScopes = function () {
    gapi.auth2.getAuthInstance().disconnect();
    
  }
}

