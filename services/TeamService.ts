import * as knex from 'knex';

export default class TeamService {
    constructor(private knex: knex) { }

    // one team : one manager -> add rules in database
    getTeam(teamId: number) {
        return this.knex.select('teamname', 'numberOfPlayers', 'logo', 'users.firstname as manager_firstname', 'users.lastname as manager_lastname')
            .from('teams')
            .innerJoin('users','teams.team_id','users.team_id')
            .where('teams.team_id', teamId)
            .andWhere('users.status','manager');
    }

    getSquad(teamId: number){
        return this.knex.select('position', 'firstname', 'lastname', 'image') //add height, weight, age later
            .from('users')
            .where('team_id', teamId)
            .andWhere('status','player');
    }

    getFixtures(teamId: number){
        console.log('again')
        return this.knex.raw(
            `SELECT t.tournament_name,
            (CASE 
            WHEN home_team.team_id = :teamId THEN away_team.teamname 
            WHEN away_team.team_id = :teamId THEN home_team.teamname 
            END) AS opponent_teamname,
            (CASE 
            WHEN home_team.team_id = :teamId THEN away_team.logo 
            WHEN away_team.team_id = :teamId THEN home_team.logo 
            END) as opponent_logo,
            (CASE 
            WHEN home_team.team_id = :teamId THEN 'AWAY TEAM' 
            WHEN away_team.team_id = :teamId THEN 'HOME TEAM' 
            END) as opponent_position,
            f.date, v.park_name, v.district, v.street
            FROM fixtures AS f
            INNER JOIN tournaments as t ON f.tournament = t.tournament_id
            INNER JOIN venue as v ON f.venue = v.venue_id
            INNER JOIN teams as home_team ON f.home_team = home_team.team_id
            INNER JOIN teams as away_team ON f.away_team = away_team.team_id
            WHERE home_team = :teamId OR away_team = :teamId
            ORDER BY f.date ASC;`, {teamId: teamId}
        ).then(res => res.rows);
    }

    getTeamList() {}
}