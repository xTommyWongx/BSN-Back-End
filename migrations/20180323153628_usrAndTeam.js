
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('teams', (table) => {
            table.increments('team_id');
            table.string('teamname');
            table.integer('numberOfPlayers');
            table.string('logo');
        }),

        knex.schema.createTable('users', (table) => {
            table.increments('user_id');
            table.string('firstname');
            table.string('lastname');
            table.string('password');
            table.string('email');
            table.integer('facebook_id');
            table.string('location');
            table.integer('team_id').unique();
            table.foreign('team_id').references('teams.team_id');
            table.string('image');
            table.string('position');
            table.string('status');
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('teams')
    ]);
};
