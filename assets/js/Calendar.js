document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");
  const hoursDiv = document.getElementById("hours");
  const monthYearSpan = document.getElementById("monthYear");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");

  let currentDate = new Date();

  // Variables para la fecha y hora actuales
  const currentTime = currentDate.toTimeString().slice(0, 5); // Hora y minutos actuales (HH:MM)
  const currentDateString = currentDate.toLocaleDateString('es-ES'); // Fecha actual en formato dd/mm/aaaa

  // Imprimir en consola para ver los valores
  console.log(`Fecha actual: ${currentDateString}`);
  console.log(`Hora actual: ${currentTime}`);

  // Horas disponibles (puedes ajustar esto según tus necesidades)
  const availableHours = [
      "09:00", "10:00", "11:00", "12:00", "13:00",
      "14:00", "15:00", "16:00", "17:00"
  ];
  
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
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const selectedDateString = selectedDate.toLocaleDateString('es-ES'); // Formatear fecha seleccionada en dd/mm/yyyy

    hoursDiv.innerHTML = `<h3>Horas disponibles para el día ${day} (${selectedDateString})</h3>`;
    availableHours.forEach(hour => {
      const hourDiv = document.createElement("div");
      const myclass = validateHour(selectedDateString, hour);
      hourDiv.classList.add(myclass);
      hourDiv.textContent = hour;
      hourDiv.addEventListener("click", () => selectHour(day, hourDiv));
      hoursDiv.appendChild(hourDiv);
    });
    hoursDiv.style.display = "block";
  }

  // Validar les hores
  function validateHour(myDate, myHour){
    const myNewDate = changeDateFormat(myDate);
    const targetDateTime = `${myNewDate}:${myHour}`;
    //console.log(targetDateTime);
    for (const item of selectedDates) {
        if (item.nextdate === targetDateTime) {
          return "fakehour"; // Se encontró una coincidencia
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
  function selectHour(day, hourDiv) {
      // Deseleccionar todas las horas previamente seleccionadas
      const allHours = document.querySelectorAll(".hour");
      allHours.forEach(hour => hour.classList.remove("selected"));
      
      // Seleccionar la hora actual
      hourDiv.classList.add("selected");

      // Obtener la fecha seleccionada
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const selectedDateString = selectedDate.toLocaleDateString('es-ES');
      const selectedHour = hourDiv.textContent;

      // Comparar la fecha y la hora seleccionadas con la fecha y hora actuales
      const now = new Date();
      const selectedDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, selectedHour.split(':')[0], selectedHour.split(':')[1]);

      if (selectedDateTime < now) {
          alert('La fecha y hora seleccionadas son anteriores a la fecha y hora actuales.');
      } else {
          alert(`Fecha seleccionada: ${selectedDateString}\nHora seleccionada: ${selectedHour}`);
          //document.getElementById("modal").style.display = "block";
      }
  }

  // Cambiar mes
  prevMonthButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar();
  });

  nextMonthButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar();
      console.log(currentDate);
  });

  //----------------------------------------------------
  //Funcionalitats Modal:
  // Añadir funcionalidad al botón para mostrar el modal
  document.getElementById("confirmButton").addEventListener("click", function() {
    alert("Selección confirmada");
    closeModal();
  });

  document.getElementById("cancelButton").addEventListener("click", function() {
    closeModal();
  });

  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }
  //--------------------------
  // Inicializar el calendario
  updateCalendar();
});
//----------------------------------------------------
// Definir el usuario: Cookies.
function DefineUser(){
    const allCookies = getAllCookies();

    username = getCookieName(allCookies);
    if (username) {
        console.log('Nombre de la cookie con token:', username);
    } else {
        console.log('No se encontró una cookie con un valor de token válido.');
    }
}

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
//--------------------------------------------------------
//Obtenció de dades hores seleccionades/validació:
function setTakenDates(response){
    selectedDates = response;
    //console.log(selectedDates);
}