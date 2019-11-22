exports.seed = function(knex) {
  return knex('activity_links').insert([
    {url: 'https://www.google.com', todo_id: 3},
    {url: 'https://www.twitter.com', todo_id: 2},
    {url: 'https://www.lambdaschool.com', todo_id: 1}
  ]);
};
