const csv = require('csvtojson');
const Tower = require('./models/tower')


async function readCSV(filePath = './file.csv') {
    const ticketData = await csv().fromFile(filePath);
    return ticketData;

}

function getTowerName(subject){
    subject = subject.toLowerCase();
    const apName = subject.split(" ")[0];
    const towerName = apName.split(".")[1]
    return towerName
}

async function genAPs(filePath = './file.csv'){
    let towers = [];
    let ticketData = await readCSV(filePath);
    let towerNames = new Set();
    for(let ticket of ticketData){
        if(ticket.Subject){
            const name = getTowerName(ticket.Subject);
            towerNames.add(name)
        }; 
    };
    for(let name of towerNames){
        tickets = ticketData.filter((ticket) => {
            return getTowerName(ticket.Subject) === name
        });
        towers.push(new Tower(name, tickets))
    };
    towers.sort((a, b) => (a.numProblems < b.numProblems) ? 1 : -1)
    return towers
}

genAPs().then((data) => {
    console.log(data);
    process.exit();
})
