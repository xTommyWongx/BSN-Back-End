exports.up = function(knex, Promise) {
    return knex.schema.table('tournaments',(table)=>{
        table.string('tournament_name');      
    });
  };
  
exports.down = function(knex, Promise) {
return knex.schema.table('tournaments',(table)=>{
    table.dropColumn('tournament_name');
})
};