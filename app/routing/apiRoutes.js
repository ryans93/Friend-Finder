var people = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(people);
    });

    app.post("/api/friends", function (req, res) {
        var recent = req.body;
        people.push(recent);
        var scoresDiff = [];
        if(people.length===1){
            res.json(false);
        }
        for (var i = 0; i < people.length - 1; i++) {
            scoresDiff[i] = {
                key: i,
                score: 0
            };
            for (var index = 0; index < 10; index++) {
                scoresDiff[i].score += Math.abs(parseInt(recent.scores[index]) - parseInt(people[i].scores[index]));
            }
            if (i === people.length - 2) {
                for (var count = 0; count < scoresDiff.length - 1; count++) {
                    for (var count2 = 0; count2 < scoresDiff.length - 1; count2++) {
                        if (scoresDiff[count2].score > scoresDiff[count2 + 1].score) {
                            var placeholder = scoresDiff[count2];
                            scoresDiff[count2] = scoresDiff[count2 + 1];
                            scoresDiff[count2 + 1] = placeholder;
                        }
                    }
                    if (count === scoresDiff.length - 2) {
                        var match = {
                            people: people[scoresDiff[0].key], 
                            compatibility: 100 - ((scoresDiff[0].score / 50) * 100)
                        }
                        res.json(match);
                    }
                }
            }
        }
    });
}