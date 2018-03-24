
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tournaments',(table)=>{
      table.increments('tournament_id');
      table.string('category');
      table.integer('number_of_teams');
      table.integer('game_size');
      table.integer('organizer_id');
      table.foreign('organizer_id').references('users.user_id');
      table.string('winner_prize');
      table.string('runnerup_prize');
      table.integer('entry_fee');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tournaments');
};
