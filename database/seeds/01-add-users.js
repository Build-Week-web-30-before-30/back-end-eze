const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {userName: 'mike', email: 'mike@gmail.com', full_name: 'Mike Attara', password: bcrypt.hashSync('12345', 11)},
        {userName: 'chioma', email: 'chioma@gmail.com', full_name: 'Chioma Nkem-eze', password: bcrypt.hashSync('lolz', 11)},
        {userName: 'lola123', email: 'lola123@gmail.com', full_name: 'Lola Sharon', password: bcrypt.hashSync('admin', 11)}
      ]);
    });
};
