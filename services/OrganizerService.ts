import * as Knex from 'knex';

export default class OrganizerService {
    constructor(private knex: Knex){ }
    // get all tournament post
    index() {
        return this.knex
            .select()
            .from('tournaments')
            .innerJoin('tournaments_dates_location', 'tournaments_dates_location.tournament_id', 'tournaments.tournament_id')
    }

    //get single tournament
    async get(id: number) {
        return this.knex
            .select()
            .from('tournaments')
            .innerJoin('tournaments_dates_location', 'tournaments_dates_location.tournament_id', 'tournaments.tournament_id')
            .where('tournaments.tournament_id', id)
    }
    
    //create tournament    
    create(organizerId: number, formData: Models.PostTournamentBody) {
        return this.knex.transaction(async (trx) => {
            try {
                const tournamentId = await trx
                    .insert({
                        category: formData.category,
                        number_of_teams: formData.number_of_teams,
                        game_size: formData.game_size,
                        organizer_id: organizerId,
                        tournament_name: formData.tournament_name,
                        runnerup_prize: formData.runnerup_prize,
                        winner_prize: formData.winner_prize,
                        entry_fee: formData.entry_fee
                    })
                    .into("tournaments")
                    .returning("tournament_id")

        
                return await trx
                    .insert({
                        date: formData.date,
                        location: formData.location,
                        tournament_id: tournamentId[0]
                    })
                    .into("tournaments_dates_location")
            }
            catch (err) {
                throw err;
            }
        })
    }

    // update tournament
    update(tournamentId: number, formData: Models.PostTournamentBody) {
        return this.knex.transaction(async (trx) => {
            try {
                await trx
                    .select()
                    .from('tournaments')
                    .where('tournaments.tournament_id', tournamentId)
                    .update({
                        category: formData.category,
                        number_of_teams: formData.number_of_teams,
                        game_size: formData.game_size,
                        tournament_name: formData.tournament_name,
                        runnerup_prize: formData.runnerup_prize,
                        winner_prize: formData.winner_prize,
                        entry_fee: formData.entry_fee
                    })
        
                await trx
                    .select()
                    .from('tournaments_dates_location')
                    .where('tournaments_dates_location.tournament_id', tournamentId)
                    .update({
                        date: formData.date,
                        location: formData.location,
                    })
            }
            catch (err) {
                throw err;
            }
         })
    }

    //delete tournament
    delete(id: number) {
        return this.knex.transaction(async (trx) => {
            try {
                await trx
                    .select()
                    .from('tournaments_dates_location')
                    .where('tournaments_dates_location.tournament_id', id)
                    .del()
            
                 await trx
                    .select()
                    .from('tournaments')
                    .where('tournaments.tournament_id', id)
                    .del()
            }
            catch (err) {
                throw err;
            }
        })
    }

    // get tournament for fixture
    async getFixture(id: number) {

        try {
            let result = await this.knex.select()
            .from('tournaments')
            .where('tournaments.tournament_id', id)
            .leftOuterJoin('league_table', 'tournaments.tournament_id', 'league_table.tournament_id')
            .leftOuterJoin('fixtures', 'fixtures.tournament', 'tournaments.tournament_id')
            .leftOuterJoin('teams', 'teams.team_id', 'league_table.team_id')
            
            return result;   
            
            // let result = await this.knex.select('tournaments.tournament_id',' league_table.*')
            
            // let result =  await this.knex.raw(`
                // SELECT * 
                // FROM "tournaments"
                // LEFT JOIN league_table ON league_table.tournament_id = tournaments.tournament_id 
                // LEFT JOIN fixtures ON fixtures.tournament = tournaments.tournament_id
                // LEFT JOIN teams ON teams.team_id = league_table.team_id
                // WHERE tournaments.tournament_id = 22;
            // `)

        }
        catch (err) {
            throw err;
        }
    }
}