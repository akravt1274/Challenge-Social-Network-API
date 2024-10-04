const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/networkDB';
// const connectionString = DB_URL;

connect(connectionString);

module.exports = connection;
