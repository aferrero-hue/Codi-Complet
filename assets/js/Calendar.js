document.addEventListener("DOMContentLoaded", () => {

  var availableHours = null;

  fetch('horas.json')
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      availableHours = data.availableHours;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
  //-----------------------------------------------------------
  const calendar = document.getElementById("calendar");
  const hoursDiv = document.getElementById("hours");
  const monthYearSpan = document.getElementById("monthYear");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");

  let currentDate = new Date();

  var userLatestHour = null;

  // Variables para la fecha y hora actuales
  const currentTime = currentDate.toTimeString().slice(0, 5); // Hora y minutos actuales (HH:MM)
  const currentDateString = currentDate.toLocaleDateString('es-ES'); // Fecha actual en formato dd/mm/aaaa
  const currentYear = currentDate.getFullYear(); // Obtain current Year

  // Variables para asociar la proxima fecha:
  var selectedDatePOST = "";

  // Imprimir en consola para ver los valores
  console.log(`Fecha actual: ${currentDateString}`);
  console.log(`Hora actual: ${currentTime}`);

  // Horas disponibles (puedes ajustar esto según tus necesidades)
  /*const availableHours = [
      "09:00", "10:00", "11:00", "12:00", "13:00",
      "14:00", "15:00", "16:00", "17:00"
  ];*/
  
  // Función para actualizar el calendario
  function updateCalendar() {
      calendar.innerHTML = "";
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      monthYearSpan.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

      for (let day = 1; day <= daysInMonth; day++) {
          const dayDiv = document.createElement("div");
          dayDiv.classList.add("day");
          dayDiv.textContent = day;
          dayDiv.addEventListener("click", () => showHours(day));
          calendar.appendChild(dayDiv);
      }
  }

  // Mostrar las horas disponibles
  function showHours(day) {
    //Recordatori: Validar per si de cas l'hora del usuari:
    UserHour(); 
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const selectedDateString = selectedDate.toLocaleDateString('es-ES');
    //---------------------------
    //Verificar el dia de la setmana: 2-5 correcte
    //PENDENT: Validar els dies correctes
    if(selectedDate.getDay() == 2 ||selectedDate.getDay() == 3 ||selectedDate.getDay() == 4 ||selectedDate.getDay() == 5){
      hoursDiv.innerHTML = `<h3>Horas disponibles para el día ${day} (${selectedDateString})</h3>`;
      availableHours.forEach(hour => {
        const hourDiv = document.createElement("div");
        const myclass = validateHour(selectedDateString, hour);
        hourDiv.classList.add(myclass);
        hourDiv.textContent = hour;
        //console.log(hourDiv.textContent);
        hourDiv.addEventListener("click", () => selectHour(day, hourDiv, myclass));
        hoursDiv.appendChild(hourDiv);
      });
      hoursDiv.style.display = "block";
    }else{
      hoursDiv.style.display = "none";
    }
  }

  // Validar les hores
  function validateHour(myDate, myHour){
    const myNewDate = changeDateFormat(myDate);
    const targetDateTime = `${myNewDate}-${myHour}`;
    for (const item of selectedDates) {
        //Validació data no valida (Caducada)
        if(validatingOldDates(myNewDate)){
            return "oldhour";
        }
        if(checkUserNextHour(targetDateTime)){
            return "myhour";
        }
        //Validació data no valida (Reservada)
        if (item.nextdate === targetDateTime) {
          return "fakehour"; // Se encontró una coincidencia
        }
        if(validatingOldHours(myHour, myNewDate)){
            return "oldhour";
        }

    }    
      return "hour"; // No se encontró ninguna coincidencia

  }

  // Cambiar ordre hores
  function changeDateFormat(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}/${month}/${day}`;
    }

  // Seleccionar una hora
  function selectHour(day, hourDiv, clase) {
      // Deseleccionar todas las horas previamente seleccionadas
      const allHours = document.querySelectorAll(".hour");
      allHours.forEach(hour => hour.classList.remove("selected"));
      
      // Obtener la fecha seleccionada
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const selectedDateString = selectedDate.toLocaleDateString('es-ES');
      //console.log(selectedDateString);
      const selectedHour = hourDiv.textContent;

      // Comparar la fecha y la hora seleccionadas con la fecha y hora actuales
      const now = new Date();
      const selectedDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, selectedHour.split(':')[0], selectedHour.split(':')[1]);

      if (selectedDateTime < now) {
          alert('La fecha y hora seleccionadas son anteriores a la fecha y hora actuales.');
      } else {
        if(clase == "fakehour"){
            //PENDENT: Verificar funcionament
            alert('Fecha no disponible :(.');
        }else{
          // Seleccionar la hora actual
          const userFound = selectedDates.some(date => date.name === username);
      
          if (userFound) {
            hourDiv.classList.add("selected");
            //alert(`Fecha seleccionada: ${selectedDateString}\nHora seleccionada: ${selectedHour}`);
            const text = `Fecha seleccionada: ${selectedDateString}\nHora seleccionada: ${selectedHour}`;
            //-----------------------------------------------------------------------------------------
            //Definir els valors, pricnipalent invertir data
            // Obtener los componentes de la fecha
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth() + 1;
            const day = selectedDate.getDate();

            selectedDatePOST = `${year}/${month}/${day}-${selectedHour}`;
            //-----------------------------------------------------------------------------------------
            const modalTextElement = document.getElementById("modalText");
            modalTextElement.textContent = text;
            document.getElementById("modal").style.display = "block";
          } else {
              //No hi ha un usuari identificat correctament: Excepció
              goingLogin();
          }
        }
      }
  }

  // Cambiar mes [PENDENTPENDENT] No pot pasar del mes actual.
  // NOTA: Ocultar el formulari.
  prevMonthButton.addEventListener("click", () => {
    const newDate = new Date(currentDate);
    console.log(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
  
    if (newDate.getFullYear() === currentYear) {
      currentDate = newDate;
      updateCalendar();
    } else {
      console.log("No se puede cambiar el calendario fuera del año actual");
    }
  });

  //[PENDENTPENDENT] Modificar a 6 nomes 6 mesos despues no per any.
  nextMonthButton.addEventListener("click", () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
  
    if (newDate.getFullYear() === currentYear) {
      currentDate = newDate;
      updateCalendar();
    } else {
      console.log("No se puede cambiar el calendario fuera del año actual");
    }
  });
  //----------------------------------------------------
  //Funcionalitats Modal:
  // Añadir funcionalidad al botón para mostrar el modal
  document.getElementById("confirmButton").addEventListener("click", function() {
    console.log(username, selectedDatePOST);
    SubmitHours(username, selectedDatePOST);
    closeModal();
  });

  document.getElementById("cancelButton").addEventListener("click", function() {
    closeModal();
  });

  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  //-----------------------------
  //userLatestHour
  function UserHour(){
    const item = selectedDates.find(element => element.name === username);
    userLatestHour = item ? item.nextdate : null;
  }
  //Validar la hora seleccionada
  function checkUserNextHour(thisDate){
    const item = selectedDates.find(element => element.name === username && element.nextdate === thisDate);
    if (item) {
      //thisDate = item.nextdate;
      return true;
    } else {
      //userLatestHour = null;
      return false;
    }
  }

  //--------------------------
  // Inicializar el calendario
  updateCalendar();
});
//----------------------------------------------------
// Definir el usuario: Cookies
function DefineUser(){
    const allCookies = getAllCookies();

    username = getCookieName(allCookies);
    //selectedDates

    if (username) {
        console.log('Nombre de la cookie con token:', username);
    } else {
        console.log('No se encontró una cookie con un valor de token válido.');
    }
}
//--------------------------------------------------------
//Funcionalitat eliminar cita:
function borrarData(){
  //console.log(username);
  eliminarData(username)
}
//--------------------------------------------------------
//Obtenció de dades hores seleccionades/validació:
function setTakenDates(response){
    selectedDates = response;
    //console.log(selectedDates);
}
//Validació Data Anterior
function validatingOldDates(mydate){
    //console.log(mydate);
    const currentDateString = new Date().toLocaleDateString('es-ES');

    const [currentDay, currentMonth, currentYear] = currentDateString.split('/');
    const currentDate = new Date(`${currentYear}-${currentMonth}-${currentDay}`);

    const [myYear, myMonth, myDay] = mydate.split('/');
    const myDateObj = new Date(`${myYear}-${myMonth}-${myDay}`);

    return myDateObj < currentDate;
}
//Validacion hora anterior
function validatingOldHours(myhour, mydate) {
    // Obtener la fecha y hora actuales
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Agregar ceros a la izquierda
    const currentDay = String(currentDate.getDate()).padStart(2, '0'); // Agregar ceros a la izquierda
    const currentDateString = `${currentYear}-${currentMonth}-${currentDay}`; // Formato yyyy-mm-dd
    const currentTime = currentDate.toTimeString().slice(0, 5); // Formato HH:MM

    // Convertir mydate al formato yyyy-mm-dd
    const [year, month, day] = mydate.split('/');
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Asegurarse de tener el formato yyyy-mm-dd

    // Verificar si mydate es igual a la fecha actual
    if (formattedDate === currentDateString) {
        // Verificar si myhour es anterior a la hora actual
        if (myhour < currentTime) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
//------------------------------
//PEDNENT: Verificar quina hora disposa el usuari :O
//PENDENT: Cancelar cita [FUNCIO API TAMBÉ]

//PROBLEMA: El tema de DOMContentLoaded hem mata.