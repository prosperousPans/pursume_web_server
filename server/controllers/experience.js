const models = require('../../db/models');

module.exports.getAllExperience = (req, res) => {

  models.Experience
    .forge()
    .where({name: req.query.name, users_id: req.query.users_id})
    .fetchAll()
    .then(experience => {
      res.status(200).send(experience);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    })
};
