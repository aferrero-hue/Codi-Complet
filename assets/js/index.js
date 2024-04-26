//Funcio per validar les dades del Registre [PENDENT]
function validate(){
    //Elements
    var nom = document.getElementById("UserInput").value; 
    var email = document.getElementById("EmailInput").value;
    var contrasenya = document.getElementById("PasswdInput").value;
    var contrasenyaValida = document.getElementById("PasswdValidInput").value;
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
    
    start();
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