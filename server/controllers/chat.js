const knex = require('knex')(require('../../knexfile'));

module.exports.getAll = (req, res) => {
  var auth_id = req.query.authid;
  knex('users')
    .where('auth_id', auth_id)
    .then((data) => {
      knex
      .raw("select id, full_name, image from users where id in (select users_b_id from connection where users_a_id=? and status = 'accept' and users_b_id in (select users_a_id from connection where users_b_id=? and status='accept'));", [data[0].id, data[0].id])
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        console.log("err", err);
        res.status(503).send(err);
      })
    })
    .catch(err => {
      console.log(err);
      res.status(503).send(err);
    })
}

module.exports.getUser = (req, res) => {
  var auth_id = req.query.authid;
  knex('users')
    .where('auth_id', auth_id)
    .then((data) => {
      res.status(200).send(data[0]);
    })
    .catch(err => {
      console.log("err", err);
      res.status(503).send(err);
    })
}

module.exports.getOtherUser = (req, res) => {
  var user = req.query.user;
  knex('users')
    .where('id', user)
    .then((data) => {
      res.status(200).send(data[0]);
    })
    .catch(err => {
      console.log("err", err);
      res.status(503).send(err);
    })
}

