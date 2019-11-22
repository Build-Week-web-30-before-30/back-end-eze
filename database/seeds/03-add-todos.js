exports.seed = function(knex) {
  return knex('todos').insert([
    {todo_name: 'Finish Lambda School', completed: 1, bucket_id: 3},
    {todo_name: 'Travel to the moon', completed: 0, bucket_id: 2},
    {todo_name: 'Seek adventure', bucket_id: 1}
  ]);
};
