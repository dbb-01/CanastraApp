// Solicitud AJAX para obtener estadísticas de equipos
document.addEventListener('DOMContentLoaded', function () {
    const resultadoDiv = document.getElementById('teams_body');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/teams_stats', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            // Limpia el div
            resultadoDiv.innerHTML = '';

            data.forEach((equipo, index) => {
                
                const filaEquipo = document.createElement('tr');
                filaEquipo.innerHTML = `
                    <td>${equipo.nombre_equipo}</td>
                    <td>${equipo.record}</td>
                    <td>${equipo.w_pct}</td>
                    <td>${equipo.ppp}</td>
                    <td>${equipo.rpp}</td>
                    <td>${equipo.app}</td>
                    <td>${equipo.fg}</td>
                    <td>${equipo.fg3}</td>
                    <td>${equipo.stl}</td>
                    <td>${equipo.blk}</td>
                `;

                resultadoDiv.appendChild(filaEquipo);
            });
           

            new DataTable('#teams', {
                buttons: ['showSelected'],
                dom: 'Bfrtip',
                select: true,
                pageLength: 30 

            });

        
        } else {
            console.error('Error al cargar el JSON.');
        }
    };

    xhr.send();
});