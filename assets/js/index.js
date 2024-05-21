//Funcio per validar les dades del Registre [PENDENT]
function validateRegister(){
    //Elements
    var nom = document.getElementById("UserInput").value; 
    var email = document.getElementById("EmailInput").value;
    var contrasenya = document.getElementById("PasswdInput").value;
    var contrasenyaValida = document.getElementById("PasswdValidInput").value;
    if(!nom || nom.trim() === '' || nom.trim().length < 6){
      console.log("El nom d'usuari no es correcte");
      return 0;
    }
    if(!validarContra(contrasenya)){
      console.log("La contrasenya no es valida");
      return 0;
    }
    if(contrasenya != contrasenyaValida){
      console.log("La contrasenya no es igual");
      return 0;
    }
    if(!validarCorreu(email)){
      console.log("El correu es incorrecte");
      return 0;
    }
    
    startRegister();
}
//Funcio per validar les dades del Login [PENDENT]
function validateLogin(){
  //Elements
  var nombre = document.getElementById("UserInput").value; 
  var contrasenya = document.getElementById("PasswdInput").value;
  if(nombre == null || contrasenya == null || nombre.trim() === '' || contrasenya.trim() === ''){
    console.log("We have a problem dear...");
  }else{
    startLogin();
  }
}
function validarCorreu(correo) {
    // Expresión regular para validar el formato de un correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}
function validarContra(con) {
    // Expresión regular para validar la contraseña
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return regex.test(con);
} 
//-------------------------------------------------------
//COOKIES:
function createCookie(nom, valor) {
  var cookieName = nom;
  var cookieValue = valor;
  var expirationMinutes = 30; // Duración de la cookie en minutos

  var date = new Date();
  date.setTime(date.getTime() + (expirationMinutes * 60 * 1000));
  var expires = "expires=" + date.toUTCString();

  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  alert("Cookie creada correctamente");
}

function checkCookies(){
  return document.cookie.length > 0;
}

function deleteCookies(){
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var cookieName = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
  alert("Todas las cookies han sido eliminadas.");
}
//---------------------------------------------------------
function goingLogin(){
  window.location.href = "login-page.html";
}