
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fixtures',(table)=>{
      table.increments('fixture_id');
      table.integer('tournament');
      table.foreign('tournament').references('tournaments.tournament_id');
      table.integer('home_team');
      table.foreign('home_team').references('teams.team_id');
      table.integer('away_team');
      table.foreign('away_team').references('teams.team_id');
      table.time('time');
      table.integer('venue');
      table.foreign('venue').references('venue.venue_id');
      table.integer('score')
      table.foreign('score').references('scores.score_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fixtures');
};
