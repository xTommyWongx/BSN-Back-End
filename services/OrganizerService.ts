import * as Knex from 'knex';

export default class OrganizerService {
    constructor(private knex: Knex) { }
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
    async getFixture(tournamentId: number) {

        try {
            return this.knex.select('t.tournament_name','home_team.teamname as home_teamname', 'home_team.logo as home_logo', 'away_team.teamname as away_teamname', 'away_team.logo as away_logo', 'f.date', 'v.park_name', 'v.district', 'v.street')
                .from('fixtures as f')
                .innerJoin('tournaments as t', 'f.tournament', 't.tournament_id')
                .innerJoin('venue as v', 'f.venue', 'v.venue_id')
                .innerJoin('teams as home_team', 'f.home_team', 'home_team.team_id')
                .innerJoin('teams as away_team', 'f.away_team', 'away_team.team_id')
                .where('f.tournament', tournamentId)
                .orderBy('f.date')
        }
        catch (err) {
            throw err;
        }
    }


}