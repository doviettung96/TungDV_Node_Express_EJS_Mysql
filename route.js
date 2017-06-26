/**
 * Created by Tung Ace on 6/26/2017.
 */

const database = require('./database');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

let e = express();
// Tells express where the parent of the /views folder is.
const publicPath = path.resolve(__dirname, "./views");
// express use the public path
e.use(express.static(publicPath));
e.use(bodyParser.urlencoded());

// Tells express to use the EJS templating module to serve views.
e.set("views", path.join(__dirname, "./views"));
// set the view engine
e.set("view engine", "ejs");
// Tells express the local port to serve on!
e.listen(10000);
e.get("/", (req, res) => {
    res.render("index");
});


e.get("/connect", (req, res) => {
    res.render("connect", {fail: false});
});

e.post("/connect", (req, res) => {
    let connectParam = req.body;
    database.connectDB(connectParam).then((connection) => {
        e.locals.connection = connection;
        res.render("login", {fail: false});
    }).catch(() => {
        res.render("connect", {fail: true});
    });
});

e.post("/login", (req, res) => {
    let connection = e.locals.connection;
    let login_entry = req.body;
    database.querryUsers(connection).then((users) => {
        let findResult = users.filter((user) => {
            return user.user_name == login_entry.user_name
                && user.user_password == login_entry.user_password;
        });
        if (findResult.length > 0) {
            res.render("home");
        }
        else {
            res.render("login", {fail: true});
        }
    }).catch(() => {
        console.log('Error when query users');
    });
});

e.get("/home", () => {
    console.log("Login success");
});
