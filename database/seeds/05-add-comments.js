exports.seed = function(knex) {
  return knex('comments').insert([
    {message: 'This is inspiring', bucket_id: 3},
    {message: 'I love this', bucket_id: 2},
    {message: 'What were you thinking? :(', bucket_id: 1}
  ]);
};
