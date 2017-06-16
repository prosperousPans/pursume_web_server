const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://172.20.0.1", neo4j.auth.basic("neo4j", "password"));

const query = require('../controllers/populateFullGraphDB.js')

let queryStart;

var populate = query.populateFullGraphDB(function (query) {
  queryStart = query
});


module.exports.getRecommendation = (req, cb) => {
  let userId = req.query.id || 2
  let queryEnding = `WITH (\`${userId}\`) as me
    MATCH (me:Users)-[:Connection]-(connected:Users)-[:Connection]-(potential:Users)
    WHERE (me)-[:MATCHED]-(connected)
    AND NOT (me)-[:Connection]-(potential)
    AND NOT (connected)-[:Connection {status:'reject'}]->(potential)
    AND NOT (connected)<-[:Connection {status:'reject'}]-(potential)
    RETURN count(potential) as PotentientialMatch, potential.id as Suggested_User_Id
    ORDER BY PotentientialMatch DESC`;


  let result = [];
  let sent = false;
  let graphDbQuery;
  let session = driver.session();
    session
      .run(queryStart + queryEnding)
      .subscribe({
        onNext: function(record) {
         result.push(record._fields)
        },
        onCompleted: function() {
          result.forEach(function(recommendation) {
            if ( Math.random() > .5 && sent === false) {
              sent = true;
              session.close();
              // res.status(200).send([recommendation, {'Recommendation Result Length': result.length}])
              graphDbQuery = [recommendation, {'Recommendation Result Length': result.length}]
              cb(graphDbQuery)
            } else {
              // res.status(200).send('null')
              graphDbQuery = null;
              cb(null);
            }
          });
          if ( sent === false ) {
            session.close();
            next();
          }
        },
        onError: function(error) {
          console.log(error);
        }
      });
      return graphDbQuery;
};
