
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tournament_requests',(table)=>{
      table.increments('tournament_request_id');
      table.integer('tournament_id');
      table.foreign('tournament_id').references('tournaments.tournament_id');
      table.integer('team_id');
      table.foreign('team_id').references('teams.team_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tournament_requests');
};
