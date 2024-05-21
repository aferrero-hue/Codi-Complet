//Elements del Programa: 

// Definir los nombres de los meses
var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Array de horas
const horas = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

// Obtener el primer día de la semana para el calendario
var firstDayOfWeek = 0; // Domingo (0), Lunes (1), Martes (2), etc.

// Inicializar el calendario con el mes y año actual
var currentDate = new Date();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

//Valors a agafar:
var mySelectedDate = null;
var mySelectedHour = null;

var selectedDates = null;
var myUser = null;

//----------------------------------------------------------
//Funcio durant la inicialització:
document.addEventListener("DOMContentLoaded", function () {
  // Crida la funció showCalendar:
  showCalendar(currentMonth, currentYear);

  // Llenar el elemento select con las horas
  var selectHora = document.getElementById("hora");
  horas.forEach(function(hora) {
    var option = document.createElement("option");
    option.value = hora;
    option.textContent = hora;
    selectHora.appendChild(option);
  });
  // Asignar la función onchange al elemento DateSelector
  var DateSelector = document.getElementById("selectedDate");
  var HourSelector = document.getElementById("hora");

  DateSelector.addEventListener("change", function() {
    console.log("El valor seleccionado ha cambiado:", this.value);
    mySelectedDate = this.value;
    restartHours();
    showButton();
  });

  HourSelector.addEventListener("change", function() {
    mySelectedHour = this.value;
    if(mySelectedHour == "default"){
      restartHours();
    }
    console.log(mySelectedHour);
    showButton();
  });
      
  // Agregar evento click al botón de mostrar selección
  document.getElementById("PutUSER").addEventListener("click", function() {
    var fechaSeleccionada = document.getElementById("selectedDate").value;
    var horaSeleccionada = document.getElementById("hora").value;
    //alert("Fecha seleccionada: " + fechaSeleccionada + "\nHora seleccionada: " + horaSeleccionada);
    const result = fechaSeleccionada + ":" + horaSeleccionada;
    SubmitHours(myUser, result);
  });

});
//---------------------------------------------------------
//Funcionalitats:

// Función para mostrar el calendario del mes y año dados
function showCalendar(month, year) {
  var firstDay = new Date(year, month, 1);
  var lastDay = new Date(year, month + 1, 0);
  var daysInMonth = lastDay.getDate();

  // Limpiar el cuerpo del calendario
  var calendarBody = document.getElementById("calendarBody");
  calendarBody.innerHTML = "";

  // Obtener el día de la semana del primer día del mes
  var startingDay = firstDay.getDay();

  // Crear las celdas del calendario para cada día del mes
  var date = 1;
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");

    // Crear celdas para los días de la semana
    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < startingDay) {
        // Celdas vacías para los días antes del primer día del mes
        var cell = document.createElement("td");
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        // Celdas vacías para los días después del último día del mes
        break;
      } else {
        // Creació taules:
        var cell = document.createElement("td");
        var button = document.createElement("button");
        button.textContent = date;
        button.setAttribute("data-day", date); // Añadir atributo de datos para guardar el día
        button.onclick = function() {
          // Al hacer clic en un día, guardar el día seleccionado
          selectedDay = parseInt(this.getAttribute("data-day"));
          // Establecer la fecha seleccionada en el campo de entrada
          document.getElementById("selectedDate").value = year + "-" + ('0' + (month + 1)).slice(-2) + "-" + ('0' + selectedDay).slice(-2);
          console.log(document.getElementById("selectedDate").value);
          mySelectedDate = this.value;
          restartHours();
          showButton();
        };
        cell.appendChild(button);
        row.appendChild(cell);
        date++;
      }
    }
      calendarBody.appendChild(row);
  }

  // Actualizar el título del calendario con el mes y año actual
  var currentMonthYear = document.getElementById("currentMonthYear");
  currentMonthYear.textContent = monthNames[month] + " " + year;

}
//--------------------------------------
// Funcions per cambiar el mes:
// NOTA: Crear Limitacions [PENDENT]
function prevMonth() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}
// Función para mostrar el siguiente mes
function nextMonth() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}
//------------------------------------
function showButton(){
  if(mySelectedDate != null && mySelectedHour != null){
    document.getElementById("PutUSER").style.display = "block";
  }else{
    document.getElementById("PutUSER").style.display = "none";
  }
}
function restartHours(){
  document.getElementById("hora").selectedIndex = 0;
  mySelectedHour = null;
}
//-------------------------------------
//Aquesta funció agafa els noms i les dates asociades.
function setTakenDates(response){
  selectedDates = response;
  //console.log(selectedDates);
}
//-------------------------------------
//Aquesta funcio determina el Uusari que utilitza la aplicació:
function DefineUser(){
  const allCookies = getAllCookies();
  console.log(allCookies);
}
//------------------------------------
//LLEGEIXME:
//SEGUENT PUNT: Crear un canvas per la selecció d'hores :O
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