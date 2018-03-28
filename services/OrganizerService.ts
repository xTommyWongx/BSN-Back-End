import * as Knex from 'knex';

export default class OrganizerService {
    constructor(private knex: Knex){ }

    // get all tournament post
    async index() {
        try {
            return await this.knex
                .select()
                .from('tournaments')
                .innerJoin('tournaments_dates_location', 'tournaments_dates_location.tournament_id', 'tournaments.tournament_id')
        }
        catch (err){
            throw err;
        }
    }
    
    //create tournament    
    //haven't stored organizer_id, need to get the id from front end
    create(reqBody: Models.PostTournamentBody) {
        return this.knex.transaction(async (trx) => {
            try {
                const tournamentId = await trx
                    .insert({
                        category: reqBody.category,
                        number_of_teams: reqBody.number_of_teams,
                        game_size: reqBody.game_size,
                        // organizer_id: reqBody.organizer_id,
                        tournament_name: reqBody.tournament_name,
                        runnerup_prize: reqBody.runnerup_prize,
                        winner_prize: reqBody.winner_prize,
                        entry_fee: reqBody.entry_fee
                    })
                    .into("tournaments")
                    .returning("tournament_id")

        
                return await trx
                    .insert({
                        date: reqBody.date,
                        location: reqBody.location,
                        tournament_id: tournamentId[0]
                    })
                    .into("tournaments_dates_location")
            }
            catch (err) {
                throw err;
            }
        })
    }
}