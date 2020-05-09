// get data from friends.js 
var people = require("../data/friends");

module.exports = function (app) {

    // get for returning all people in friends.js
    app.get("/api/friends", function (req, res) {
        res.json(people);
    });

    // post for adding new person
    app.post("/api/friends", function (req, res) {
        var recent = req.body;
        // new person added to friends.js
        people.push(recent);
        var scoresDiff = [];
        // return if only 1 person is stored and there are no possible matches
        if (people.length === 1) {
            return res.json(false);
        }

        // algorithm for calculating compatability
        // compare score differences to others in friends.js
        for (var i = 0; i < people.length - 1; i++) {
            scoresDiff.push({
                key: i,
                score: 0
            });
            //calculate total difference in survey scores
            for (var index = 0; index < 10; index++) {
                scoresDiff[i].score += Math.abs(parseInt(recent.scores[index]) - parseInt(people[i].scores[index]));
            }
        }
        // sort scoresDiff array
        for (var count = 0; count < scoresDiff.length - 1; count++) {
            for (var count2 = 0; count2 < scoresDiff.length - 1; count2++) {
                if (scoresDiff[count2].score > scoresDiff[count2 + 1].score) {
                    var placeholder = scoresDiff[count2];
                    scoresDiff[count2] = scoresDiff[count2 + 1];
                    scoresDiff[count2 + 1] = placeholder;
                }
            }
        }
        // create match object
        var match = {
            people: people[scoresDiff[0].key],
            compatibility: 100 - ((scoresDiff[0].score / 50) * 100)
        }
        // return match
        return res.json(match);
    });
}