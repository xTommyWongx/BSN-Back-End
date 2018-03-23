
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores',(table)=>{
      table.increments('score_id');
      table.integer('home_score');
      table.integer('away_score');
      table.integer('winner_id');
      table.foreign('winner_id').references('teams.team_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores');
};
