const csv = require('csvtojson');


class Tower {
    constructor (name, problems){
        this.name = name;
        this.problems = problems;
        this.numProblems = problems.length

        this.intermittentProblems = this.problems.filter((problem) => {
            return problem['Ticket Problem'].indexOf('Intermittent') !== -1
        });
        this.numIntermittent = this.intermittentProblems.length;


        this.noConnectProblems = this.problems.filter((problem) => {
            return problem['Ticket Problem'].indexOf('No Connection') !== -1 || problem['Ticket Problem'].indexOf('No Service') !== -1
        });
        this.numNoConnectProblems = this.noConnectProblems.length;


        this.slowSpeedIssues = this.problems.filter((problem) => {
            return problem['Ticket Problem'].indexOf('Slow Speed') !== -1
        });
        this.numSlowSpeedIssues = this.slowSpeedIssues.length;

        this.userSpecificProblems = this.problems.filter((problem) => {
            return problem['Ticket Problem'].indexOf('User Specific') !== -1
        });
        this.numUserSpecificProblems = this.userSpecificProblems.length;
    }

    static async readCSV(filePath = '../file.csv') {
        const ticketData = await csv().fromFile(filePath);
        return ticketData;
    }

    static getTowerName(subject){
        subject = subject.toLowerCase();
        const apName = subject.split(" ")[0];
        const towerName = apName.split(".")[1]
        return towerName
    }

    static async genTowers(filePath = './file.csv'){
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
}

module.exports = Tower