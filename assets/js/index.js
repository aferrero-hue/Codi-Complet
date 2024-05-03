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
// Función para establecer el Access Token y guardarlo en una cookie
function setAccessToken(token) {
  //accessToken = token;
  // Guardar el token en una cookie con una duración de 1 hora
  document.cookie = `access_token=${token}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/`;
}
//-------------------------------------------------------
// Funció per aplicar cambis quan un usuari s'ha registrat.
function RegistredChanges(){
  var enlace = document.getElementById("Basic-Login-ref");
  enlace.textContent = "LogOut";
  enlace.onclick = function() {
    // Aquí puedes poner la función que deseas ejecutar cuando se haga clic en el enlace
    LogOut();
  };
}