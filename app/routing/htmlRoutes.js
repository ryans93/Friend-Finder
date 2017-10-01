var path = require("path");

module.exports = function (app) {

    app.get("/survey", function (req, res) { //return survey page
        res.sendFile(path.join(__dirname, "/../public/survey.html")); 
    });

    app.use(function (req, res) { //return home page
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
}
