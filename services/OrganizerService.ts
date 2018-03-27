import * as Knex from 'knex';

export default class OrganizerService {
    constructor(private knex: Knex){ }

    create(reqBody: Models.PostTournamentBody) {
            this.knex.transaction(async (trx) => {
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
            } catch (err) {
                throw err;
            }
        })
    }
}