//Funcio per validar les dades del Registre [PENDENT]
function validateRegister(){
    //Elements
    var nom = document.getElementById("UserInput").value; 
    var email = document.getElementById("EmailInput").value;
    var contrasenya = document.getElementById("PasswdInput").value;
    var contrasenyaValida = document.getElementById("PasswdValidInput").value;
    //---------------------
    //Reinicialitzar valors:
    $("#Rnom").text("");
    $("#Rmail").text("");
    $("#Rpasswd").text("");
    $("#Rpasswd2").text("");

    //--------------------
    //PENDENT: MAX 20 CARACTERS NOM
    if(!nom || nom.trim() === '' || nom.trim().length <= 3){
      $("#Rnom").text("El nom d'usuari no es correcte");
      return 0;
    }
    if(!validarCorreu(email)){
      //console.log("El correu es incorrecte");
      $("#Rmail").text("El format del correu es incorrecte");
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
//Funcio per validar les dades del Login [PENDENT]
function validateLogin(){
  //Elements
  var nombre = document.getElementById("UserInput").value; 
  var contrasenya = document.getElementById("PasswdInput").value;
  //--------------
  $("#Lnom").text("");
  $("#Lpasswd").text("");
  //--------------
  if(nombre == null || nombre.trim() === ''){
    console.log("Introdueix un nom d'usuari");
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
//----------
// Función para obtener todas las cookies como un objeto
function getAllCookies() {
  const cookies = document.cookie.split(';'); // Divide la cadena de cookies en pares clave-valor
  const cookieObject = {};

  // Itera sobre los pares clave-valor y los agrega al objeto cookieObject
  cookies.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      const decodedName = decodeURIComponent(name);
      const decodedValue = decodeURIComponent(value);
      cookieObject[decodedName] = decodedValue;
  });

  return cookieObject;
}
// Función para encontrar el nombre de la cookie con un valor de token
function getCookieName(cookies) {
  for (const [name, value] of Object.entries(cookies)) {
      if (isJWT(value)) {
          return name;
      }
  }
  return null;
}
// Función para verificar si una cadena es un JWT
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
          console.log(`Se encontró una cookie con el nombre ${cookieName}.`);
          // Puedes devolver true aquí si quieres indicar que se encontró una cookie
          return cookieName;
      }
  }

  console.log("No se encontraron cookies con ninguno de los nombres proporcionados.");
  // Devuelve false si no se encontró ninguna cookie con los nombres proporcionados
  return null;
}
function getNextDateForUser(userDataArray, userName) {
  for (const user of userDataArray) {
      if (user.name === userName) {
          return user.nextdate;
      }
  }
  return null; // Si no se encontró el usuario en el array
}
//-----------
//GET Username: ORIGINAL VERSION
/*function GettingUser(){
  const allCookies = getAllCookies();

  let username = getCookieName(allCookies);
  //selectedDates

  if (username) {
      console.log('Nombre de la cookie con token:', username);
      return username;
  } else {
      console.log('No se encontró una cookie con un valor de token válido.');
  }
}*/
//---------------------------------------------------------
function goingLogin(){
  window.location.href = "login-page.html";
}
//---------------------------------------------------------
//Validació Data Anterior (NOTA: Tinc la mateixa funció en Calendar.js)
function esFechaAnterior(fechaString) {
  // Dividir el string en fecha y hora
  const [fecha, hora] = fechaString.split('-');
  // Dividir la fecha en año, mes y día
  const [anio, mes, dia] = fecha.split('/').map(Number);
  // Dividir la hora en horas y minutos
  const [horas, minutos] = hora.split(':').map(Number);

  // Crear un objeto Date con la fecha y hora dadas
  const fechaDada = new Date(anio, mes - 1, dia, horas, minutos);

  // Obtener la fecha y hora actuales
  const fechaActual = new Date();

  // Comparar las fechas
  return fechaDada < fechaActual;
}
function formatearFechaHora(fechaHoraString) {
  const meses = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'];

  // Dividir el string en fecha y hora
  const [fecha, hora] = fechaHoraString.split('-');
  // Dividir la fecha en año, mes y día
  const [anio, mes, dia] = fecha.split('/').map(Number);
  // Dividir la hora en horas y minutos
  let [horas, minutos] = hora.split(':').map(Number);

  // Formatear los minutos para que siempre tengan dos dígitos
  minutos = minutos.toString().padStart(2, '0');

  // Determinar si es AM o PM y convertir a formato de 12 horas
  const periodo = horas >= 12 ? 'pm' : 'am';
  horas = horas % 12 || 12; // Convertir 0 horas a 12 para el formato de 12 horas

  // Crear la cadena formateada
  const fechaFormateada = `${dia} de ${meses[mes - 1]} de ${anio} a les ${horas}:${minutos}${periodo}`;

  return fechaFormateada;
}