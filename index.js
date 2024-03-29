const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require("./config/mongoose");
// FOR SESSION COOKIES
const session = require('express-session');
// const passport = require('passport');
const passport = require('./config/passport-local');
const MongoStore = require('connect-mongo')(session);

const passportJWT = require('./config/passport-jwt-strategy');

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const custMware = require('./config/middleware');

const passportGoogle = require('./config/passport-google-oauth2-strategy');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(expressLayout);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

const { urlencoded } = require('express');
// SET UP VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', 'views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'something',
    saveUninitialiazed: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
        function (err) {
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(custMware.setFlash);

app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in listen method:${err}`);
        return;
    }
    console.log(`Server running successfully on port:${port}`);
})