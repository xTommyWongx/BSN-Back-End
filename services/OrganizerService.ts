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
            return this.knex.select('t.tournament_id', 't.tournament_name', 'f.fixture_id', 'home_team.team_id as home_team_id', 'home_team.teamname as home_teamname', 'home_team.logo as home_logo', 'away_team.team_id as away_team_id', 'away_team.teamname as away_teamname', 'away_team.logo as away_logo', 'f.date', 'v.park_name', 'v.district', 'v.street')
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

    updateScore(fixture: Models.TournamentFixtures, score: { home_score: number, away_score: number }) {
        return this.knex.transaction(async trx => {
            try {
                let homePoints = this.calculatePoints(+score.home_score, +score.away_score);
                let homeGoalDifference = this.goalDifference(+score.home_score, +score.away_score);
                let awayPoints = this.calculatePoints(+score.away_score, +score.home_score);
                let awayGoalDifference = this.goalDifference(+score.away_score, +score.home_score);

                await trx.update(score)
                    .from('fixtures')
                    .where('fixture_id', fixture.fixture_id)
                // .returning('fixture_id')

                await trx.raw(`
                    INSERT INTO league_table (tournament_id, fixture_id, team_id, points, goals_scored, goals_conceded, goal_difference) 
                    VALUES (${fixture.tournament_id}, ${fixture.fixture_id}, ${fixture.home_team_id}, ${homePoints}, ${+score.home_score}, ${+score.away_score}, ${homeGoalDifference})
                    ON CONFLICT ON CONSTRAINT fixture_id_team_id_unqiue DO UPDATE
                    SET goals_scored = ${score.home_score}, goals_conceded = ${score.away_score}, goal_difference = ${homeGoalDifference}, points = ${homePoints};`
                )

                await trx.raw(`
                    INSERT INTO league_table (tournament_id, fixture_id, team_id, points, goals_scored, goals_conceded, goal_difference) 
                    VALUES (${fixture.tournament_id}, ${fixture.fixture_id}, ${fixture.away_team_id}, ${awayPoints}, ${+score.away_score}, ${+score.home_score}, ${awayGoalDifference})
                    ON CONFLICT ON CONSTRAINT fixture_id_team_id_unqiue DO UPDATE
                    SET goals_scored = ${score.away_score}, goals_conceded = ${score.home_score}, goal_difference = ${awayGoalDifference}, points = ${awayPoints};`
                )
            }
            catch (err) {
                throw err
            }
        })
    }

    calculatePoints(ownScore: number, opponentScore: number) {
        return ((ownScore > opponentScore) ? 3 : ((ownScore < opponentScore) ? 0 : 1));
    }

    goalDifference(ownScore: number, opponentScore: number){
        return ownScore - opponentScore;
    }
}