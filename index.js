const fs = require('fs').promises;
const csv = require('csvtojson');
const AP = require('./AP')

let csvFilePath = './file.csv'

async function readCSV(filePath = './file.csv') {
    const ticketData = await csv().fromFile(filePath);
    return ticketData;

}

async function genAPs(filePath = './file.csv'){
    let APs = [];
    let ticketData = await readCSV(filePath);
    let apData = []
    let apNames = new Set();
    for(let ticket of ticketData){
        if(ticket.Subject){
            console.log(ticket.Subject)
            let apName = ticket.Subject.split(" ")
            apNames.add(apName[0])
        }; 
    };
    for(let name of apNames){
        tickets = ticketData.filter((ticket) => {
            return ticket.Subject.indexOf(name) !== -1
        });
        APs.push(new AP(name, tickets))
    };
    return APs
}

module.exports = {readCSV , genAPs}