const electron = require("electron");
const express = require("express");
// Module to control application life.
const mysql = require("mysql");

const app = electron.app;
// initialize ejs parser

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

const bodyParser = require("body-parser");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let e = express();
// Tells express where the parent of the /views folder is.
e.use("/views", express.static(__dirname));
e.use(bodyParser.urlencoded());

// Tells express to use the EJS templating module to serve views.

e.set("view engine", "ejs");
// Tells express the local port to serve on!
e.listen(10000);
// 'index' is describing our index.ejs file!

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    // // and load the index.html of the app.
    // mainWindow.loadURL(url.format({
    //   pathname: path.join(__dirname, 'index.ejs'),
    //   protocol: 'file:',
    //   slashes: true
    // }))
    mainWindow.loadURL("http://localhost:10000");
    mainWindow.focus();

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

e.get("/", (req, res) => {
    res.render("index");
});


e.get("/connect", (req, res) => {
    res.render("connect", { fail: false });
});

e.post("/connect", (req, res) => {
    let connectParam = req.body;
    connectDB(connectParam).then(() => {
        res.render("login", { fail: false });
    }).catch((err) => {
        res.render("connect", { fail: true });
    });
});

e.post("/login", (req, res) => {
    let login_entry = req.body;
    let allUsers = e.locals.users;
    let findResult = allUsers.filter((user) => {
        return user.user_name == login_entry.user_name
            && user.user_password == login_entry.user_password;
    });
    console.log(findResult);
    if (findResult.length > 0) {
        res.render("home");
    }
    else {
        res.render("login", { fail: true });
        console.log("Login failed");
    }
});

e.get("/home", () => {
    console.log("Login success");
});


// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

let connectDB = function (param) {
    let result = [];
    // Add the credentials to access your database
    return new Promise((resolve, reject) => {

        let connection = mysql.createConnection({
            host    : param.host,
            user    : param.user_name,
            password: param.password,
            database: param.db_name,
            port    : param.port
        });

        // connect to mysql
        connection.connect((err) => {
            // in case of error
            if (err) {
                console.log(err.code);
                console.log(err.fatal);

                reject(err);
            }
        });

        // Perform a query
        $query = " SELECT `user_name`, `user_password` FROM `user` LIMIT 10";

        connection.query($query, (err, rows, fields) => {
            if (err) {
                console.log("An error ocurred performing the query.");
                console.log(err);
                reject(err);
            }
            e.locals.users = rows;
            result = rows;
        });

        // Close the connection
        connection.end(() => {
            resolve(result);
            // The connection has been closed
        });
    });
};