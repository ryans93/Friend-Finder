var path = require("path");

module.exports = function (app) {

    //return survey page
    app.get("/survey", function (req, res) { 
        res.sendFile(path.join(__dirname, "/../public/survey.html")); 
    });

    //return home page
    app.use(function (req, res) { 
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
}
