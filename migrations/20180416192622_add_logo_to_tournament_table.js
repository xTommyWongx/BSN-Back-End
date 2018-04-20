
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('tournaments', (table) => {
        table.string('tournament_logo');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('tournaments', (table) => {
        table.dropColumn('tournament_logo');
    })
};
