exports.up = function(knex, Promise) {
    return knex.schema.raw('ALTER TABLE users ALTER COLUMN facebook_id TYPE numeric');
};
  
exports.down = function(knex, Promise) {
    return knex.schema.raw('ALTER TABLE users ALTER COLUMN facebook_id TYPE integer');
};
