class AP {
    constructor (name, problems){
        console.log("New AP!")
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
}

module.exports = AP