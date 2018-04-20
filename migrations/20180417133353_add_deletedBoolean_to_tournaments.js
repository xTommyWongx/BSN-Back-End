
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('tournaments', (table) => {
        table.boolean('deleted').defaultTo(false);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('tournaments', (table) => {
        table.dropColumn('deleted');
    })
};
