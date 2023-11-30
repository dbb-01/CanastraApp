// Solicitud AJAX para obtener estadísticas de equipos
document.addEventListener('DOMContentLoaded', function () {
    const playerStatsBody = document.getElementById('players');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/players_stats', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            // Limpia el cuerpo de la tabla
            playerStatsBody.innerHTML = '';

            data.forEach((jugador) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${jugador.nombre}</td>
                    <td>${jugador.equipo}</td>
                    <td>${jugador.pts}</td>
                    <td>${jugador.fg_pct}</td>
                    <td>${jugador.fg3_pct}</td>
                    <td>${jugador.reb}</td>
                    <td>${jugador.ast}</td>
                    <td>${jugador.stl}</td>
                    <td>${jugador.blk}</td>
                    <td>${jugador.plus_minus}</td>


                `;

                playerStatsBody.appendChild(row);
            });

            new DataTable('#players_table', {
                buttons: ['showSelected'],
                dom: 'Bfrtip',
                select: true,
                pageLength: 30  // Configurar el número de filas por página

            });
        } else {
            console.error('Error al cargar las estadísticas de los jugadores.');
        }
    };

    xhr.send();
});


