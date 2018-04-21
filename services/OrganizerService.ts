import * as Knex from 'knex';

export default class OrganizerService {

    constructor(private knex: Knex) { 
    }
    // get all tournaments post for organizer and player
    index() {
        return this.knex
            .select('tournaments.*', 'tournaments_dates_location.*', 'users.firstname', 'users.lastname')
            .from('tournaments')
            .innerJoin('tournaments_dates_location', 'tournaments_dates_location.tournament_id', 'tournaments.tournament_id')
            .innerJoin('users', 'organizer_id', 'user_id')
            .where('tournaments.deleted','false')
            .orderBy('tournaments_dates_location.date')
    }

    // get all tournaments post for manager    
    // indexForManager(teamId: number) {
    //     return this.knex.raw(`
    //         SELECT 
    //             t.tournament_id AS id, t.category, t.number_of_teams, t.game_size, t.organizer_id, t.winner_prize, t.runnerup_prize, t.entry_fee, t.tournament_name,
    //             t_dates_location.date, t_dates_location.location,
    //             t_teams.team_id AS t_team_id,
    //             t_requests.team_id AS request_team_id,
    //             users.firstname, users.lastname
    //         FROM tournaments AS t
            

    //         INNER JOIN users
    //         ON t.organizer_id = users.user_id
            
    //         INNER JOIN tournaments_dates_location AS t_dates_location
    //         ON t.tournament_id = t_dates_location.tournament_id
            
    //         LEFT OUTER JOIN tournaments_teams AS t_teams
    //         ON t.tournament_id = t_teams.tournament_id
            
    //         LEFT OUTER JOIN tournament_requests AS t_requests
    //         ON t.tournament_id = t_requests.tournament_id
            
    //         WHERE t_teams.team_id = ${teamId} OR t_teams.team_id IS NULL
    //         AND t.deleted = FALSE
    //         ORDER BY t_dates_location.date

    //     `)
    // }

    indexForManager(teamId: number) {
        return this.knex.raw(`
        SELECT 
            t.tournament_id 	AS id, 
            t.category		    AS catgory, 
            t.number_of_teams	AS number_of_teams, 
            t.game_size 		AS game_size, 
            t.organizer_id 		AS organizer_id, 
            t.winner_prize		AS winner_prize, 
            t.runnerup_prize	AS runnerup_prize,  
            t.entry_fee		    AS entry_fee,  
            t.tournament_name	AS tournament_name,  
            tdl.date		    AS date,  
            tdl.location		AS location,  
                
            CASE 
                WHEN tt.team_id IS NOT null THEN 'I' 				-- organizer approved
            WHEN tr.team_id IS null AND tt.team_id IS null THEN 'J' 	-- nothing is clicked, show JOIN button
            WHEN tr.team_id IS NOT null AND tt.team_id IS null THEN 'R' 	-- clicked JOIN button and wait for approval  
            ELSE '-'
            END			        AS condition
        FROM tournaments AS t
        LEFT JOIN users 			AS u 	ON t.organizer_id = u.user_id
        LEFT JOIN tournaments_dates_location 	AS tdl 	ON t.tournament_id = tdl.tournament_id
        LEFT JOIN tournament_requests 		AS tr 	ON t.tournament_id = tr.tournament_id AND tr.team_id = ?
        LEFT JOIN tournaments_teams 		AS tt 	ON t.tournament_id = tt.tournament_id AND tt.team_id = ?
        WHERE t.deleted = FALSE
        ORDER BY tdl.date   
        `,[teamId, teamId]);
    }

        // return this.knex.raw(`
        //     SELECT 
        //     t.tournament_id AS id, t.category, t.number_of_teams, t.game_size, t.organizer_id, t.winner_prize, t.runnerup_prize, t.entry_fee, t.tournament_name,
        //     t_dates_location.date, t_dates_location.location,
        //     array_agg(t_teams.team_id) AS t_team_id,
        //     array_agg(t_requests.team_id) AS request_team_id
        //     FROM tournaments AS t
        
        //     INNER JOIN tournaments_dates_location AS t_dates_location
        //     ON t.tournament_id = t_dates_location.tournament_id
        
        //     LEFT OUTER JOIN tournaments_teams AS t_teams
        //     ON t.tournament_id = t_teams.tournament_id
        
        //     LEFT OUTER JOIN tournament_requests AS t_requests
        //     ON t.tournament_id = t_requests.tournament_id
        
        //     GROUP BY t.tournament_id, t.category, t.number_of_teams, t.game_size, t.organizer_id, t.winner_prize, t.runnerup_prize, t.entry_fee, t.tournament_name,
        //     t_dates_location.date, t_dates_location.location
        
        
        //     ORDER BY t_dates_location.date
        // `)

        

    //get single tournament/api/organizers
    get(id: number) {
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
            console.log('del')
            try {
                await trx
                    .select()
                    .from('tournaments')
                    .update({deleted: true})
                    .where('tournaments.tournament_id', id)
            }
            catch (err) {
                throw err;
            }
        })
    }

    // get tournament for fixture
    getFixture(tournamentId: number) {
        try {
            return this.knex.select('t.tournament_id', 't.tournament_name', 'f.fixture_id', 'home_team.team_id as home_team_id', 'home_team.teamname as home_teamname', 'home_team.logo as home_logo', 'away_team.team_id as away_team_id', 'away_team.teamname as away_teamname', 'away_team.logo as away_logo', 'f.date', 'v.park_name', 'v.district', 'v.street','f.home_score', 'f.away_score')
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

    getUpcomingFixture(tournamentId: number) {
        try {
            return this.knex.first('t.tournament_id', 't.tournament_name', 'f.fixture_id', 'home_team.team_id as home_team_id', 'home_team.teamname as home_teamname', 'home_team.logo as home_logo', 'away_team.team_id as away_team_id', 'away_team.teamname as away_teamname', 'away_team.logo as away_logo', 'f.date', 'v.park_name', 'v.district', 'v.street')
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

    // get edit tournament info
    async getEditFixture(fixtureId: number) {
        try {
            const venues = await this.knex.select().from('venue');
            const teams = await this.knex
                .select()
                .from('fixtures as f')
                .where('f.fixture_id', fixtureId)
                .innerJoin('tournaments_teams', 'f.tournament', 'tournaments_teams.tournament_id')
                .innerJoin('teams', 'teams.team_id', 'tournaments_teams.team_id')

            const result = await this.knex.raw(`
                SELECT
                    f.fixture_id, f.tournament, f.home_team, f.away_team, f.date, 
                    home_team.teamname AS home_team, away_team.teamname AS away_team, 
                    venue.street, venue.district, venue.park_name

                FROM fixtures AS f
                INNER JOIN teams as home_team
                ON f.home_team = home_team.team_id
                INNER JOIN teams as away_team
                ON f.away_team = away_team.team_id
                INNER JOIN venue
                ON f.venue = venue.venue_id
                WHERE f.fixture_id = 11
            `)

            const fixtures = result.rows;

            return { venues, teams, fixtures };
        }
        catch (err) {
            throw err;
        }
    }

    // update tournament fixture
    updateFixture(fixtureId: number, fixtureValue: Models.AddTournamentFixture) {
        return this.knex
            .select()
            .from('fixtures')
            .where('fixtures.fixture_id', fixtureId)
            .update({
                home_team: fixtureValue.home_team,
                away_team: fixtureValue.away_team,
                venue: fixtureValue.venue,
                date: fixtureValue.date
            })
    }

    // get teams who joint the tournament for fixture
    async getTeamInfo(id: number) {
        try {
            const venues = await this.knex.select().from('venue');
            const teams = await this.knex
                .select("teams.team_id", "teams.teamname")
                .from('tournaments_teams as t_team')
                .innerJoin('teams', 't_team.team_id', 'teams.team_id')
                .where('t_team.tournament_id', id)

            return { venues, teams };

        }
        catch (err) {
            throw err;
        }
    }

    // add fixture to tournament
    addFixture(id: number, fixtureData: Models.AddTournamentFixture) {
        try {
            return this.knex.insert({
                tournament: id,
                home_team: fixtureData.home_team,
                away_team: fixtureData.away_team,
                venue: fixtureData.venue,
                date: fixtureData.date
            }).into('fixtures')
        }
        catch (err) {
            throw err;
        }
    }

    updateScore(fixture: Models.TournamentFixtures, score: { home_score: number, away_score: number }) {
        return this.knex.transaction(async trx => {
            try {
                let { points: homePoints, goalDifference: homeGoalDifference, win: homeWin, draw: homeDraw, lose: homeLose } = this.result(+score.home_score, +score.away_score);
                let { points: awayPoints, goalDifference: awayGoalDifference, win: awayWin, draw: awayDraw, lose: awayLose } = this.result(+score.away_score, +score.home_score);

                await trx.update(score)
                    .from('fixtures')
                    .where('fixture_id', fixture.fixture_id)
                // .returning('fixture_id')

                await trx.raw(`
                    INSERT INTO league_table (tournament_id, fixture_id, team_id, points, goals_scored, goals_conceded, goal_difference, win, draw, lose) 
                    VALUES (:tournament_id, :fixture_id, :home_team_id, :homePoints, :home_score, :away_score, :homeGoalDifference, :homeWin, :homeDraw, :homeLose )
                    ON CONFLICT ON CONSTRAINT fixture_id_team_id_unqiue DO UPDATE
                    SET goals_scored = :home_score, goals_conceded = :away_score, goal_difference = :homeGoalDifference, points = :homePoints, win = :homeWin, draw = :homeDraw, lose = :homeLose;`
                    , {
                        tournament_id: fixture.tournament_id,
                        fixture_id: fixture.fixture_id,
                        home_team_id: fixture.home_team_id,
                        homePoints: homePoints,
                        home_score: +score.home_score,
                        away_score: +score.away_score,
                        homeGoalDifference: homeGoalDifference,
                        homeWin: homeWin,
                        homeDraw: homeDraw,
                        homeLose: homeLose
                    })

                await trx.raw(`
                    INSERT INTO league_table (tournament_id, fixture_id, team_id, points, goals_scored, goals_conceded, goal_difference, win, draw, lose) 
                    VALUES (:tournament_id, :fixture_id, :away_team_id, :awayPoints, :away_score, :home_score, :awayGoalDifference, :awayWin, :awayDraw, :awayLose)
                    ON CONFLICT ON CONSTRAINT fixture_id_team_id_unqiue DO UPDATE
                    SET goals_scored = :away_score, goals_conceded = :home_score, goal_difference = :awayGoalDifference, points = :awayPoints, win = :awayWin, draw = :awayDraw, lose = :awayLose;`
                    , {
                        tournament_id: fixture.tournament_id,
                        fixture_id: fixture.fixture_id,
                        away_team_id: fixture.away_team_id,
                        awayPoints: awayPoints,
                        home_score: +score.home_score,
                        away_score: +score.away_score,
                        awayGoalDifference: awayGoalDifference,
                        awayWin: awayWin,
                        awayDraw: awayDraw,
                        awayLose: awayLose
                    })
            }
            catch (err) {
                console.log(err)
            }
        })
    }

    getRanking(tournamentId: number) {
        return this.knex.raw(`
        SELECT league_table.team_id, teams.teamname, teams.logo, 
                SUM(points) AS points, 
                SUM(goals_scored) AS goals_scored, 
                SUM(goals_conceded) AS goals_conceded, 
                SUM(goal_difference) AS goal_difference, 
                COUNT(league_table.fixture_id) AS games,
                COUNT(CASE WHEN win = true THEN 1 END) AS win, 
                COUNT(CASE WHEN draw = true THEN 1 END) AS draw, 
                COUNT(CASE WHEN lose = true THEN 1 END) AS lose
        FROM league_table
        INNER JOIN teams
        ON league_table.team_id = teams.team_id
        WHERE tournament_id = :tournamentId
        GROUP BY league_table.team_id, teams.teamname, teams.logo
        ORDER BY points DESC, goal_difference DESC
        `, { tournamentId: tournamentId }).then(res => res.rows)
    }

    result(ownScore: number, opponentScore: number) {
        let win = false;
        let draw = false;
        let lose = false;
        ((ownScore > opponentScore) ? (win = true) : ((ownScore < opponentScore) ? (lose = true) : (draw = true)));;

        let points = ((ownScore > opponentScore) ? 3 : ((ownScore < opponentScore) ? 0 : 1));;
        let goalDifference = ownScore - opponentScore;

        return {
            points: points,
            goalDifference: goalDifference,
            win: win,
            draw: draw,
            lose: lose
        };
    }

    // check if there are join tournament requests from teams
    async getRequests(userId: number) {
        try {
            return await this.knex.raw(`
                SELECT *
                FROM tournament_requests AS t_requests
                INNER JOIN tournaments AS t
                ON t_requests.tournament_id = t.tournament_id
                INNER JOIN users
                ON t.organizer_id = users.user_id
                INNER JOIN teams
                ON t_requests.team_id = teams.team_id
                WHERE t.organizer_id = ${userId}
            `)
        }
        catch (err) {
            throw err;
        }
    }

    async acceptJoinTournament(tournamentTeamId: number, teamId: number, requestId: number) {
        return this.knex.transaction(async (trx) => {
            try {
                await trx
                    .select()
                    .insert({
                        tournament_id: tournamentTeamId,
                        team_id: teamId
                    })
                    .into('tournaments_teams')

                await trx
                    .select()
                    .from('tournament_requests')
                    .where('tournament_requests.tournament_request_id', requestId)
                    .del();
            }
            catch (err) {
                throw err;
            }
        })
    }

    rejectJoinTournament(requestId: number) {
        return this.knex
            .select()
            .from('tournament_requests')
            .where('tournament_requests.tournament_request_id', requestId)
            .del();
    }
}