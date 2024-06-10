//Funcio per validar les dades del Registre
function validateRegister(){
    //Elements
    var nom = document.getElementById("UserInput").value; 
    var email = document.getElementById("EmailInput").value;
    var contrasenya = document.getElementById("PasswdInput").value;
    var contrasenyaValida = document.getElementById("PasswdValidInput").value;
    var numero = document.getElementById("TelInput").value;
    //---------------------
    //Reinicialitzar valors:
    $("#Rnom").text("");
    $("#Rmail").text("");
    $("#Rpasswd").text("");
    $("#Rpasswd2").text("");
    $("#Rtel").text("");

    //--------------------
    if (!nom || nom.trim() === '' || nom.trim().length <= 6 || nom.trim().length > 20) {
      $("#Rnom").text("El nom d'usuari no és correcte (Ha de tenir entre 6 i 20 caràcters)");
      return 0;
    }    
    if(!validarCorreu(email)){
      //console.log("El correu es incorrecte");
      $("#Rmail").text("El format del correu es incorrecte");
      return 0;
    }
    if(!validarnumero(numero)){
      $("#Rtel").text("El format del numero de telefon es incorrecte");
      return 0;
    }
    if(!validarContra(contrasenya)){
      $("#Rpasswd").text("La contrasenya no es valida, intenta amb una nova contrasenya");
      return 0;
    }
    if(contrasenya != contrasenyaValida){
      $("#Rpasswd2").text("La contrasenya no es identica en els dos camps");
      return 0;
    }
    
    startRegister();
}
//Funcio per validar les dades del Login
function validateLogin(){
  //Elements
  var nombre = document.getElementById("UserInput").value; 
  var contrasenya = document.getElementById("PasswdInput").value;
  //--------------
  $("#Lnom").text("");
  $("#Lpasswd").text("");
  //--------------
  if(nombre == null || nombre.trim() === ''){
    $("#Lnom").text("Introdueix un nom d'usuari");
    return 0;
  }
  if(contrasenya == null || contrasenya.trim() === ''){
    $("#Lpasswd").text("Introdueix una contrasenya");
    return 0;
  }
    
  startLogin();
  
}
function validarCorreu(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}
function validarContra(con) {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return regex.test(con);
} 
//-------------------------------------------------------
//COOKIES:
function createCookie(nom, valor) {
  var cookieName = nom;
  var cookieValue = valor;
  var expirationMinutes = 30;

  var date = new Date();
  date.setTime(date.getTime() + (expirationMinutes * 60 * 1000));
  var expires = "expires=" + date.toUTCString();

  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  //alert("Cookie creada correctamente");
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
}
//----------
function getAllCookies() {
  const cookies = document.cookie.split(';');
  const cookieObject = {};

  cookies.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      const decodedName = decodeURIComponent(name);
      const decodedValue = decodeURIComponent(value);
      cookieObject[decodedName] = decodedValue;
  });

  return cookieObject;
}
function getCookieName(cookies) {
  for (const [name, value] of Object.entries(cookies)) {
      if (isJWT(value)) {
          return name;
      }
  }
  return null;
}
function isJWT(token) {
  const jwtPattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/;
  return jwtPattern.test(token);
}
//-----------
//Verificar Usuari:
function validateUser(userDataArray) {
  const cookieNames = userDataArray.map(user => user.name);
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());

  for (const cookie of cookies) {
      const [cookieName] = cookie.split('=');
      if (cookieNames.includes(cookieName)) {
          return cookieName;
      }
  }

  return null;
}
function getNextDateForUser(userDataArray, userName) {
  for (const user of userDataArray) {
      if (user.name === userName) {
          return user.nextdate;
      }
  }
  return null; 
}
//---------------------------------------------------------
function goingLogin(){
  window.location.href = "login-page.html";
}
//---------------------------------------------------------
//Validació Data Anterior
function esFechaAnterior(fechaString) {
  const [fecha, hora] = fechaString.split('-');
  const [anio, mes, dia] = fecha.split('/').map(Number);
  const [horas, minutos] = hora.split(':').map(Number);

  const fechaDada = new Date(anio, mes - 1, dia, horas, minutos);
  const fechaActual = new Date();
  return fechaDada < fechaActual;
}
function formatearFechaHora(fechaHoraString) {
  const meses = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'];

  const [fecha, hora] = fechaHoraString.split('-');
  const [anio, mes, dia] = fecha.split('/').map(Number);
  let [horas, minutos] = hora.split(':').map(Number);

  minutos = minutos.toString().padStart(2, '0');

  const periodo = horas >= 12 ? 'pm' : 'am';
  horas = horas % 12 || 12;

  const fechaFormateada = `${dia} de ${meses[mes - 1]} de ${anio} a les ${horas}:${minutos}${periodo}`;

  return fechaFormateada;
}
//----------------------------------------------
function validarnumero(telefono) {
  const numeroLimpio = telefono.replace(/[^\d]/g, '');
  
  const esLongitudValida = numeroLimpio.length === 9;
  
  const soloDigitos = /^\d+$/.test(numeroLimpio);
  
  return esLongitudValida && soloDigitos;
}
