
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id');
            table.string('username', 255).notNullable().unique();
            table.string('email', 255).notNullable().unique();
            table.string('full_name', 255).notNullable();
            table.string('password', 50).notNullable()
        })
        .createTable('buckets', table => {
            table.increments('id');
            table.string('bucket_name', 255).notNullable();
            table.boolean('visibility').defaultTo(0);
            table.date('deadline').notNullable();
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('users')
                .onDelete('CASCADE')
        })
        .createTable('todos', table => {
            table.increments('id');
            table.string('todo_name', 255).notNullable();
            table.boolean('completed').defaultTo(false);
            table.integer('bucket_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('buckets')
                .onDelete('CASCADE')
        })
        .createTable('activity_links', table => {
            table.increments('id');
            table.string('url', 255).notNullable();
            table.integer('todo_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('todos')
                .onDelete('CASCADE')
        })
        .createTable('comments', table => {
            table.increments('id');
            table.string('message', 255).notNullable();
            table.integer('bucket_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('buckets')
                .onDelete('CASCADE')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('comments')
        .dropTableIfExists('links')
        .dropTableIfExists('todos')
        .dropTableIfExists('buckets')
        .dropTableIfExists('users')
};
