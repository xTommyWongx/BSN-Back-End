
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('fixtures', (table) => {
        table.dropColumn('score');
        table.integer('home_score');
        table.integer('away_score');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('fixtures', (table) => {
        table.integer('score')
        table.foreign('score').references('scores.score_id');
        table.dropColumn('home_score');
        table.dropColumn('away_score');
    })
};
