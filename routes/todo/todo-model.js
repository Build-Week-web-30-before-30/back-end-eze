const db = require('../../database/dbConfig');

const getATodo = (id) => {        
    return Promise.all(db('todos').where(id), db('activity_links'))
        .then(([todo, links]) => {
            return {
                id: todo.id,
                todo_name: todo.todo_name,
                completed: todo.completed ? true : false,
                activity_links: links
                    .filter(link => todo.id === link.todo_id)
                    .map(link => {
                        return {
                            id: link.id,
                            url: link.url
                        }
                    })
            }
        })
}

const createATodo = (todo) => {
    return db('todos').insert(todo)
        .then((idArr) => getATodo(idArr[0]));
}


module.exports = {
  createATodo,
}