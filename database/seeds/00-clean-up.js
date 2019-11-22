const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return knex('comments').truncate()
    .then(() => {
      return knex('activity_links').truncate()
        .then(() => {
          return knex('todos').truncate()
            .then(() => {
              return knex('buckets').truncate()
                .then(() => {
                    return cleaner.clean(knex, {
                        mode: 'truncate',
                        restartIdentity: true, // Used to tell PostgresSQL to reset the ID counter
                        ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
                        });
                });
            });
        });
    });
};