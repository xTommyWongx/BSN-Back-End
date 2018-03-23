
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tournaments_teams',(table)=>{
      table.increments('tournaments_teams_id');
      table.integer('tournament_id');
      table.foreign('tournament_id').references('tournaments.tournament_id');
      table.integer('team_id');
      table.foreign('team_id').references('teams.team_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tournaments_teams');
};
