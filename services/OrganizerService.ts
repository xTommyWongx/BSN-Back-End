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
    create(formData: Models.PostTournamentBody) {
        return this.knex.transaction(async (trx) => {
            try {
                const tournamentId = await trx
                    .insert({
                        category: formData.category,
                        number_of_teams: formData.number_of_teams,
                        game_size: formData.game_size,
                        // organizer_id: formData.organizer_id,
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
}