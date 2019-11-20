exports.seed = function(knex) {
  return knex('buckets').truncate()
    .then(function () {
      return knex('buckets').insert([
        {bucket_name: 'Life Goals', visibility: 1, deadline: '2019-11-30', user_id: 1},
        {bucket_name: 'Relationship Goals', visibility: 0, deadline: '2019-12-01', user_id: 1},
        {bucket_name: 'Career Goals', deadline: '2020-01-01', user_id: 2}
      ]);
    });
};
