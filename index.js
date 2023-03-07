const express = require('express');
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const cookieParser = require('cookie-parser');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: '/assets/scss',
    dest: 'assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

const expressLayout = require('express-ejs-layouts');
const { urlencoded } = require('express');
const MongoStore = require('connect-mongo');
// const passport = require('passport');
// before the routes get loaded we need to use epressLayout
app.use(expressLayout);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
    name: 'codeial',
    secret: 'something',
    saveUninitialiazed: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok')
    }
    )
}));

app.use(passport.initialize());
app.use(passport, session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));


app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error in listen method:${err}`);
        return;
    }
    console.log(`Server running successfully on port:${port}`);
})