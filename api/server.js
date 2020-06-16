let express = require('express');
let helmet = require('helmet');
let cors = require('cors');
let session = require('express-session'); // install using npm
let KnexSessionStore = require('connect-session-knex')(session); // intall library pass session
//gives us a function which we pass session in and we get another function back

let usersRouter = require("../users/users-router.js");
let authRouter = require("../auth/auth-router.js");
let requiresAuth = require("../auth/requires-auth.js");
let dbConnection = require('../data/connection');

let sessionConfig = {
    name: 'cookieName',
    secret: process.env.SESSION_SECRET || "this is the secret",
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: process.env.COOKIE_SECURE || false, // true means use only over https, in dev we use http
        httpOnly: true, // js code on the client cannot access the session cookie
    },
    resave: false,
    saveUninitialized: true,//GDPR compliance, read up on the docs
    store: new KnexSessionStore({//config
        knex: dbConnection, // connection to db, bring it in
        tablename: 'sessions', //extra configs
        sidfieldname: 'sid', //session id
        createTable: true,
        clearInterval: 6000, // delete expired sessions by that interval in milliseconds
    }),
}

let server = express();

server.use(helmet());
server.use(session(sessionConfig)); // turns on sessions, gives ability to save
//information about client on our end, and client gets a cookie to use on another endpoint.
server.use(express.json());
server.use(cors());


server.use("/api/users", requiresAuth, usersRouter);
server.use("/api/auth", authRouter);

server.get('/api', (req, res) => {
    res.status(200).json({ api: "up" })
})

module.exports = server;