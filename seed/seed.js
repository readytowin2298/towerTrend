const real_db = require('../db.js')
const { Client } = require("pg");

const test_db = new Client({
    connectionString : 'postgres://fmaespfg:NqWGXNRf3-QK8xtpr0hs3vkjGIKSLDfa@queenie.db.elephantsql.com:5432/fmaespfg'
})

const dbs = [real_db, test_db];

for(i=0; i < dbs.length; i++){
    dbs[i].query()
}