
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('fixtures', (table) => {
        table.dateTime('date').notNullable();
        table.dropColumn('time');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('fixtures', (table) => {
        table.dropColumn('date');
        table.time('time').notNullable();
    })
};
