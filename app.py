from flask import Flask, render_template, jsonify
from flask_cors import CORS

from nba_api.stats.endpoints import leaguestandings
from nba_api.stats.endpoints import leagueleaders
from nba_api.stats.endpoints import leaguedashteamstats
from nba_api.stats.endpoints import leaguedashplayerstats
from nba_api.stats.endpoints import scoreboard
from datetime import date

from datetime import datetime, timedelta

#PS C:\myNBAapp> flask --app app  run --debug


app = Flask(__name__)
CORS(app)  # Habilita CORS para toda la aplicación

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/teams')
def teams():
    return render_template('teams.html')

@app.route('/players')
def players():
    return render_template('players.html')

@app.route('/lastGames')
def lastGames():
    return render_template('lastGames.html')


#Clasificación ESTE
@app.route('/obtener_clasificacion_este', methods=['GET'])
def obtener_clasificacion_este():
    standings = leaguestandings.LeagueStandings(season='2023-24')
    data_frame = standings.get_data_frames()[0]
    equipos_conferencia_este = data_frame[data_frame['Conference'] == 'East']

    equipos_lista = []

    for index, equipo in equipos_conferencia_este.iterrows():
        nombre_ciudad = equipo['TeamCity']
        nombre_equipo = equipo['TeamName']
        record = f"{equipo['WINS']}-{equipo['LOSSES']}"

        equipo_dict = {
            'nombre_ciudad': nombre_ciudad,
            'nombre_equipo': nombre_equipo,
            'record': record
        }

        equipos_lista.append(equipo_dict)

    return jsonify(equipos_lista)

#Clasificación OESTE
@app.route('/obtener_clasificacion_oeste', methods=['GET'])
def obtener_clasificacion_oeste():
    standings = leaguestandings.LeagueStandings(season='2023-24')
    data_frame = standings.get_data_frames()[0]
    equipos_conferencia_este = data_frame[data_frame['Conference'] == 'West']

    equipos_lista = []

    for index, equipo in equipos_conferencia_este.iterrows():
        nombre_ciudad = equipo['TeamCity']
        nombre_equipo = equipo['TeamName']
        record = f"{equipo['WINS']}-{equipo['LOSSES']}"

        equipo_dict = {
            'nombre_ciudad': nombre_ciudad,
            'nombre_equipo': nombre_equipo,
            'record': record
        }

        equipos_lista.append(equipo_dict)

    return jsonify(equipos_lista)


@app.route('/max_anotadores', methods=['GET'])
def max_anotadores():
     # máximos anotadores de la liga por partido
    leaders = leagueleaders.LeagueLeaders(per_mode48='PerGame')

    # formato DataFrame
    data_frame = leaders.get_data_frames()[0]

    # Filtrar dataframe 
    data_frame_filtered = data_frame[['PLAYER', 'PTS']]

    # Ordenar
    data_frame_filtered = data_frame_filtered.sort_values(by='PTS', ascending=False)

    # 10 primeros
    top_10_jugadores = data_frame_filtered.head(10)

    # Convertir datos a diccionario
    top_10_jugadores_dict = top_10_jugadores.to_dict(orient='records')

    # Devolver el resultado
    return jsonify(top_10_jugadores_dict)

#Clasificación Max_reboteadores
@app.route('/max_reboteadores', methods=['GET'])
def max_reboteadores():
     # máximos reboteadores de la liga por partido
    leaders = leagueleaders.LeagueLeaders(per_mode48='PerGame')

    # formato DataFrame
    data_frame = leaders.get_data_frames()[0]

    # Filtrar dataframe 
    data_frame_filtered = data_frame[['PLAYER', 'REB']]

    # Ordenar
    data_frame_filtered = data_frame_filtered.sort_values(by='REB', ascending=False)

    # 10 primeros
    top_10_jugadores = data_frame_filtered.head(10)

    # Convertir datos a diccionario
    top_10_jugadores_dict = top_10_jugadores.to_dict(orient='records')

    # Devolver el resultado
    return jsonify(top_10_jugadores_dict)

#Clasificación Max_anotadores
@app.route('/max_asistentes', methods=['GET'])
def max_asistentes():
     # máximos asistentes de la liga por partido
    leaders = leagueleaders.LeagueLeaders(per_mode48='PerGame')

    # formato DataFrame
    data_frame = leaders.get_data_frames()[0]

    # Filtrar dataframe 
    data_frame_filtered = data_frame[['PLAYER', 'AST']]

    # Ordenar
    data_frame_filtered = data_frame_filtered.sort_values(by='AST', ascending=False)

    # 10 primeros
    top_10_jugadores = data_frame_filtered.head(10)

    # Convertir datos a diccionario
    top_10_jugadores_dict = top_10_jugadores.to_dict(orient='records')

    # Devolver el resultado
    return jsonify(top_10_jugadores_dict)


#stats_equipos
@app.route('/teams_stats', methods=['GET'])
def teams_stats():
    
    standings = leaguedashteamstats.LeagueDashTeamStats(per_mode_detailed='PerGame')
    equipos = standings.get_data_frames()[0]

    equipos_lista = []

    for index, equipo in equipos.iterrows():
        nombre_equipo = equipo['TEAM_NAME']
        record = f"{equipo['W']}-{equipo['L']}"
        ppp = equipo['PTS']
        rpp = equipo['REB']
        app = equipo['AST']
        fg = equipo['FG_PCT']
        fg3 = equipo['FG3_PCT']
        stl = equipo['STL']
        blk = equipo['BLK']
        w_pct = equipo['W_PCT']

        equipo_dict = {
            'nombre_equipo': nombre_equipo,
            'record': record,
            'ppp' : ppp,
            'rpp' : rpp,
            'app' : app,
            'fg' : fg,
            'fg3' : fg3,
            'stl' : stl,
            'blk' : blk,
            'w_pct' : w_pct

        }

        equipos_lista.append(equipo_dict)

    return jsonify(equipos_lista)



#stats_jugadores
@app.route('/players_stats', methods=['GET'])
def players_stats():
    standings = leaguedashplayerstats.LeagueDashPlayerStats(per_mode_detailed='PerGame')
    jugadores = standings.get_data_frames()[0]

    jugadores_lista = []

    for index, jugador in jugadores.iterrows():
        nombre = jugador['PLAYER_NAME']
        equipo = jugador['TEAM_ABBREVIATION']
        pts = jugador['PTS']
        fg_pct = round(jugador['FG_PCT'] * 100, 2)
        fg3_pct = round(jugador['FG3_PCT'] *100, 2)
        reb = jugador['REB']
        ast = jugador['AST']
        stl = jugador['STL']
        blk = jugador['BLK']
        plus_minus = jugador['PLUS_MINUS']

        equipo_dict = {
            'nombre': nombre,
            'equipo': equipo,
            'pts': pts,
            'fg_pct': fg_pct,
            'fg3_pct': fg3_pct,
            'reb': reb,
            'ast': ast,
            'stl': stl,
            'blk': blk,
            'plus_minus': plus_minus,

        }

        jugadores_lista.append(equipo_dict)

    return jsonify(jugadores_lista)

@app.route('/last_games', methods=['GET'])
def last_games():
    try:
        #Noite anterior
        dia_anterior = date.today()-timedelta(days=1)
        games_data = scoreboard.Scoreboard(day_offset=0, game_date=dia_anterior, league_id='00').get_dict()
        
        return jsonify(games_data)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)})
     



if __name__ == '__main__':
    app.run(debug=True)