const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));

module.exports.getConnect = (req, res) => {
  console.log("GET CONNECT", req)
  console.log("GET CONNECT", req.query)
  models.Connection
    .forge()
    .where({users_b_id: req.query.users_b_id})
    .fetchAll()
    .then(connection => {
      res.status(200).send(connection);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    })
};

module.exports.getAccept = (req, res) => {
  console.log("GET ACCEPT", req.query)  
  models.Connection
    .forge()
    .where({users_b_id: req.query.users_b_id, status: req.query.status})
    .fetchAll()
    .then(connection => {
      res.status(200).send(connection);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    })
};

module.exports.getReason = (req, res) => {
  console.log("GET REASON", req.query)    
  knex
  .raw("select reason from connection where users_b_id = ? and status = ? group by reason order by count(*) desc limit 1;",
    [req.query.users_b_id,req.query.status])
  .then(result => {
    let topReason = result.rows[0].reason;
    res.send(topReason)
  });
};

module.exports.getVertical = (req, res) => {  
  console.log("GET VERTICAL", req.query)      
  knex
  .raw("select vertical from users where id in (select users_a_id from connection where users_b_id = ? and status = ?) group by vertical order by count(*) desc limit 1;", 
    [req.query.users_b_id,req.query.status])
  .then(result => {
    console.log('result raw', result.rows[0].vertical)
    let topVertical = result.rows[0].vertical;
    res.send(topVertical)
  });
};
