
exports.up = function(knex, Promise) {
 return knex.schema.createTable('venue',(table)=>{
     table.increments('venue_id');
     table.string('street');
     table.string('district');
     table.string('park_name');
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('venue');
};
