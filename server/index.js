'use strict';
const app = require('./app');
const chat = require('./chat');
const db = require('../db');
const PORT = process.env.port || 3333;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
