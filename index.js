const fs = require('fs').promises;
const neatCsv = require('neat-csv');
const AP = require('./AP')

async function readCSV() {
    const records = await fs.readFile('./tickets.csv', async(err, data) =>{
        if(err){console.log(err); return};
        const parsed = await neatCsv(data);
        return parsed;
    })
    console.log(records);
    return records;
}


module.exports = readCSV