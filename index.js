const Tower = require('./models/tower')


Tower.genTowers().then((data) => {
    console.log(data);
    process.exit();
})
