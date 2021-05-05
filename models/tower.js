const csv = require('csvtojson');
const db = require('../db.js')

class Tower {
    constructor (name, problems, owner){
        this.name = name;
        this.problems = problems;
        this.owner = owner
        this.numProblems = problems.length

        this.intermittentProblems = this.problems.filter((problem) => {
            return problem['Ticket Problem'].indexOf('Intermittent') !== -1
        });
        this.numIntermittentProblems = this.intermittentProblems.length;


        this.noConnectProblems = this.problems.filter((problem) => {
            return problem['Ticket Problem'].indexOf('No Connection') !== -1 || problem['Ticket Problem'].indexOf('No Service') !== -1
        });
        this.numNoConnectProblems = this.noConnectProblems.length;


        this.slowSpeedProblems = this.problems.filter((problem) => {
            return problem['Ticket Problem'].indexOf('Slow Speed') !== -1
        });
        this.numSlowSpeedProblems = this.slowSpeedProblems.length;

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

    static async genTowers(owner, filePath = './file.csv'){
        let towers = [];
        let ticketData = await this.readCSV(filePath);
        let towerNames = new Set();
        for(let ticket of ticketData){
            if(ticket.Subject){
                const name = this.getTowerName(ticket.Subject);
                towerNames.add(name)
            }; 
        };
        for(let name of towerNames){
            let tickets = ticketData.filter((ticket) => {
                return this.getTowerName(ticket.Subject) === name
            });
            name  = name.charAt(0).toUpperCase() + name.slice(1);
            towers.push(new Tower(name, tickets, owner))
        };
        towers.sort((a, b) => (a.numProblems < b.numProblems) ? 1 : -1);
        for(let tower of towers){
            let id = await db.query(`INSERT INTO towers 
                (name, owner, num_problems, num_no_connect_problems, num_intermittent_problems, 
                    num_slow_speed_issues, num_user_specific_problems)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id`, 
                [tower.name, tower.owner, tower.numProblems, tower.numNoConnectProblems, 
                    tower.numIntermittentProblems, tower.numSlowSpeedProblems, tower.numUserSpecificProblems]);
            let ticketIds = [];
            for(let tickets of tower.tickets){
                let ticketId = await db.query(` INSERT INTO tickets
                (number, subject, date, time, queue, assigned_to, label, ticket_problem)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id`, []);

            }
        }
        return towers
    }
}

module.exports = Tower