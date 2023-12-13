document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';
    }, 700);
});



// Solicitud AJAX para clasificación ESTE
document.addEventListener('DOMContentLoaded', function () {
    const resultadoDiv = document.getElementById('clas_este');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/obtener_clasificacion_este', true); 
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            // Limpia el div
            resultadoDiv.innerHTML = '';

            // Itera a través de los equipos y escribe en el div
            data.forEach((equipo, index) => {
                const nombreCiudad = equipo.nombre_ciudad;
                const nombreEquipo = equipo.nombre_equipo;
                const record = equipo.record;
                resultadoDiv.classList.add("clasificacion")

                const filaJugador = document.createElement('tr');
                filaJugador.innerHTML = `<th scope="row">${index+1}</th><td>${nombreCiudad} ${nombreEquipo}</td><td>${record}</td>`;

                //Asignar clase según estén en puestos de PlayOffs, Play In o Fuera
                if (index < 6) filaJugador.classList.add("PO");
                if (index >= 6 && index < 10) filaJugador.classList.add("PI");
                if (index >= 10) filaJugador.classList.add("OUT");


                resultadoDiv.appendChild(filaJugador);
            });
        } else {
            console.error('Error al cargar el JSON.');
        }
    };

    xhr.send();
});

// Solicitud AJAX para clasificación OESTE
document.addEventListener('DOMContentLoaded', function () {
    const resultadoDiv = document.getElementById('clas_oeste');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/obtener_clasificacion_oeste', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            // Limpia el div
            resultadoDiv.innerHTML = '';

            // Itera a través de los equipos y escribe en el div
            data.forEach((equipo, index) => {
                const nombreCiudad = equipo.nombre_ciudad;
                const nombreEquipo = equipo.nombre_equipo;
                const record = equipo.record;
                resultadoDiv.classList.add("clasificacion")

                const filaJugador = document.createElement('tr');
                filaJugador.innerHTML = `<th scope="row">${index+1}</th><td>${nombreCiudad} ${nombreEquipo}</td><td>${record}</td>`;

                //Asignar clase según estén en puestos de PlayOffs, Play In o Fuera
                if (index < 6) filaJugador.classList.add("PO");
                if (index >= 6 && index < 10) filaJugador.classList.add("PI");
                if (index >= 10) filaJugador.classList.add("OUT");


                resultadoDiv.appendChild(filaJugador);
            });
        } else {
            console.error('Error al cargar el JSON.');
        }
    };

    xhr.send();
});

// Solicitud AJAX para max_anotadores
document.addEventListener('DOMContentLoaded', function () {
    const resultadoDiv = document.getElementById('max_anotadores');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/max_anotadores', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

           // Limpia el div
           resultadoDiv.innerHTML = '';

           // Itera a través de los máximos anotadores y escribe en el div
           data.forEach((jugador, index) => {
               const nombreJugador = jugador.PLAYER;
               const puntosPorPartido = jugador.PTS;

               const filaJugador = document.createElement('tr');
                filaJugador.innerHTML = `<th scope="row">${index+1}</th><td>${nombreJugador}</td><td>${puntosPorPartido}</td>`;

                //Para marcar el LIDER
                if (index === 0){
                    filaJugador.classList.add("lider");
                }
               resultadoDiv.appendChild(filaJugador)
            });
        } else {
            console.error('Error al cargar el JSON.');
        }
    };

    xhr.send();
});


// Solicitud AJAX para max_reboteadores
document.addEventListener('DOMContentLoaded', function () {
    const resultadoDiv = document.getElementById('max_reboteadores');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/max_reboteadores', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

           // Limpia el div
           resultadoDiv.innerHTML = '';

           // Itera a través de los máximos reboteadores y escribe en el div
           data.forEach((jugador, index) => {
               const nombreJugador = jugador.PLAYER;
               const rebotesPorPartido = jugador.REB;

               const filaJugador = document.createElement('tr');
               filaJugador.innerHTML = `<th scope="row">${index+1}</th><td>${nombreJugador}</td><td>${rebotesPorPartido}</td>`;
            //Para marcar el LIDER
                if (index === 0){
                    filaJugador.classList.add("lider");
                }
               resultadoDiv.appendChild(filaJugador)
            });
        } else {
            console.error('Error al cargar el JSON.');
        }
    };

    xhr.send();
});

// Solicitud AJAX para max_reboteadores
document.addEventListener('DOMContentLoaded', function () {
    const resultadoDiv = document.getElementById('max_asistentes');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/max_asistentes', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

           // Limpia el div
           resultadoDiv.innerHTML = '';

           // Itera a través de los máximos asistentes y escribe en el div
           data.forEach((jugador, index) => {
               const nombreJugador = jugador.PLAYER;
               const asistenciasPorPartido = jugador.AST;
               const filaJugador = document.createElement('tr');
               filaJugador.innerHTML = `<th scope="row">${index+1}</th><td>${nombreJugador}</td><td>${asistenciasPorPartido}</td>`;


            //Para marcar el LIDER
                if (index === 0){
                   filaJugador.classList.add("lider");
                }
               resultadoDiv.appendChild(filaJugador)
            });
        } else {
            console.error('Error al cargar el JSON.');
        }
    };

    xhr.send();
});


