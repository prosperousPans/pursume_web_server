const axios = require('axios');

let query = '';

if ( process.env.DATABASE_URL ) {
  axios.get('http://localhost:5555/populate-full-graphDB')
    .then(function (response) {
      module.exports.query = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
} else {
  axios.get('http://localhost:3000/populate-full-graphDB')
    .then(function (response) {
      module.exports.query = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
