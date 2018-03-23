
exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests',(table)=>{
      table.increments('request_id');
      table.integer('player_id');
      table.foreign('player_id').references('users.user_id');
      table.integer('manager_id');
      table.foreign('manager_id').references('users.user_id');
      table.boolean('request_to_player');
      table.boolean('request_to_manager');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requests');
};
