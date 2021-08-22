//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function ingreso(user, pass){  

    if (user.trim()==="" || pass.trim()===""){ //Chequea que el dato recibido no esté vacío. 

        alert("Ingrese datos correctos");
    
    }else{

    localStorage.setItem("usuario", user.trim()); //setItem almacena el dato en la posición "usuario"
    localStorage.setItem("password", pass.trim()); // Almaceno la contraseña
    sessionStorage.setItem("usuario", user.trim());
    location.href="inicio.html";
    alert (" Bienvenido Usuario : " + user); 
    
    }
}

function laproximasale(){
    alert("Anota el pass en papel para la próxima");
    

}

function desconectate(){
localStorage.clear();
sessionStorage.clear();
location.href="index.html";
}