
// Solicitud AJAX para obtener estadísticas de equipos
document.addEventListener('DOMContentLoaded', function () {
    const playerStatsBody = document.getElementById('games');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/last_games', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayScores(data);
            //asignar_eventos(data);
        }
    };
    xhr.send();

    function displayScores(data) {
        var table = document.getElementById('games');

        let n_equipos = data['resultSets'][1]['rowSet'].length;
        // Obtener la lista de partidos
        var games = data['resultSets'][1]['rowSet'];
        // Iterar sobre la lista de partidos
        for (var i = 0; i < n_equipos; i+=2) {
            // Obtener las ciudades
            let team_visitante = games[i][5];
            let pts_visitante = games[i][21];
            let team_local = games[i+1][5];
            let pts_local = games[i+1][21]; // Ajusta el índice según la estructura de tus datos
            let local_abreviation = games[i][4]
            let visitante_abreviation = games[i][4]

            if (pts_visitante>pts_local){
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${team_local}</td>
                    <td>${pts_local}</td>
                    <td class = 'win'>${pts_visitante}</td>
                    <td>${team_visitante}</td>
    
                `;

                // Agregar la fila a la tabla
                playerStatsBody.appendChild(row)

            } else {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${team_local}</td>
                    <td class = 'win'>${pts_local}</td>
                    <td>${pts_visitante}</td>
                    <td>${team_visitante}</td>

                `;
                // Agregar la fila a la tabla
                playerStatsBody.appendChild(row)
            }
        }
    };


});

