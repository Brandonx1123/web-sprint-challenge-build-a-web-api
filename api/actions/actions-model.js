const db = require("../../data/dbConfig.js");
const mappers = require("../../data/helpers/mappers");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db("actions");
}

// ^^ my get wasnt working, so looked at other models in projects and copied this to make my get work ;]

function getById(id) {
  let query = db("actions");

  if (id) {
    return query
      .where("id", id)
      .first()
      .then((action) => {
        if (action) {
          return mappers.actionToBody(action);
        } else {
          return null;
        }
      });
  } else {
    return query.then((actions) => {
      return actions.map((action) => mappers.actionToBody(action));
    });
  }
}

function insert(action) {
  return db("actions")
    .insert(action, "id")
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db("actions")
    .where("id", id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("actions").where("id", id).del();
}
