import * as knex from 'knex';

export default class TeamService {
    constructor(private knex: knex) { }

    getTeam(teamId: number) {
        return this.knex.select('*')
            .from('teams')
            .where('team_id', teamId);
    }

    getSquad(teamId: number){
        return this.knex.select('position', 'firstname', 'lastname') //add height, weight, age later
            .from('users')
            .where('team_id', teamId);
    }

    getTeamList() { }
}