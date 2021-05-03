const { Client } = require("pg");

const db = new Client({
    connectionString : "postgres://lyftyftn:0db7qPcB3Lt3DSG3rUSzx7waBaxdFl79@queenie.db.elephantsql.com:5432/lyftyftn"
})




db.connect();

module.exports = db;