
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('league_table', (table) => {
        table.integer('fixture_id').notNullable();
        table.foreign('fixture_id').references('fixtures.fixture_id');
        table.unique(['fixture_id','team_id'], 'fixture_id_team_id_unqiue');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('league_table', (table) => {
        table.dropUnique(['fixture_id','team_id'], 'fixture_id_team_id_unqiue');
        table.dropColumn('fixture_id');
    })
};
