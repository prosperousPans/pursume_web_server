const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));

module.exports.insertConnection = (req, res) => {
  models.Connection.forge({
    users_a_id: req.body.users_a_id,
    users_b_id: req.body.users_b_id,
    status: req.body.status,
    reason: req.body.reason,
  })
    .save()
    .then(result => {
      res.send(result.attributes);
    })
}

module.exports.sliceMatch = (req, res) => {
  // knex
  // .raw("update users set daily_all_matches = ? where id = ?;", [req.body.daily_all_matches, req.body.id])
  // .then(result => {
  //   console.log('DONE')
  //   res.status(202).send(result);
  // });
  res.send('TEST')
}