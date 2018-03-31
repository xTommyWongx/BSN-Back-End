
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.raw('ALTER TABLE fixtures ADD CONSTRAINT home_not_equal_away CHECK (away_team <> home_team)'),
        knex.schema.alterTable('fixtures',(table)=>{
            table.integer('tournament').notNullable().alter();
            table.integer('home_team').notNullable().alter();
            table.integer('away_team').notNullable().alter();
            table.time('time').notNullable().alter();
            table.integer('venue').notNullable().alter();
          })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.raw('ALTER TABLE fixtures DROP CONSTRAINT home_not_equal_away'),
        knex.schema.alterTable('fixtures',(table)=>{
            table.integer('tournament').alter();
            table.integer('home_team').alter();
            table.integer('away_team').alter();
            table.time('time').alter();
            table.integer('venue').alter();
          })
    ])
};
