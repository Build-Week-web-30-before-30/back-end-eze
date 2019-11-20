
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments();
            table.string('username', 255).notNullable().unique();
            table.string('email', 255).notNullable().unique();
            table.string('full_name', 255).notNullable();
            table.string('password', 50).notNullable()
        })
        .createTable('buckets', table => {
            table.increments();
            table.string('bucket_name', 255).notNullable();
            table.boolean('visibility').defaultTo(false);
            table.date('deadline').notNullable();
            table.integer('users_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('users')
                .onDelete('CASCADE')
        })
        .createTable('todos', table => {
            table.increments();
            table.string('todos_name', 255).notNullable();
            table.boolean('completed').defaultTo(false);
            table.integer('bucket_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('buckets')
                .onDelete('CASCADE')
        })
        .createTable('links', table => {
            table.increments();
            table.string('url', 255).notNullable();
            table.boolean('completed').defaultTo(false);
            table.integer('todo_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('todos')
                .onDelete('CASCADE')
        })
        .createTable('comments', table => {
            table.increments();
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
