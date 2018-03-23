
exports.up = function(knex, Promise) {
  return knex.schema.createTable('league_table',(table)=>{
      table.increments();
      table.integer('tournament_id');
      table.foreign('tournament_id').references('tournaments.tournament_id');
      table.integer('team_id');
      table.foreign('team_id').references('teams.team_id');
      table.integer('points');
      table.integer('goals_scored');
      table.integer('goals_conceded');
      table.integer('goal_difference');
      table.string('group');
    })
};

exports.down = function(knex, Promise) {
  return schema.dropTable('league_table');
};
