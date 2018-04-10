
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('league_table', (table) => {
        table.integer('fixture_id').notNullable();
        table.foreign('fixture_id').references('fixtures.fixture_id');
        table.unique(['fixture_id','team_id'], 'fixture_id_team_id_unqiue');
        table.boolean('win');
        table.boolean('draw');
        table.boolean('lose');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('league_table', (table) => {
        table.dropUnique(['fixture_id','team_id'], 'fixture_id_team_id_unqiue');
        table.dropColumn('fixture_id');
        table.dropColumn('win');
        table.dropColumn('draw');
        table.dropColumn('lose');
    })
};
