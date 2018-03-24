
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users',(table)=>{
        table.dropUnique('team_id');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users',(table)=>{
        table.unique('team_id');
      })
};
