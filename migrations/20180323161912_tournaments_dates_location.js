
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tournaments_dates_location',(table)=>{
      table.increments('location_date_id');
      table.date('date');
      table.string('location');
      table.integer('tournament_id');
      table.foreign('tournament_id').references('tournaments.tournament_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tournaments_dates_location')
};
