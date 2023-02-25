const express = require('express');
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

const expressLayout = require('express-ejs-layouts');
const { urlencoded } = require('express');
// before the routes get loaded we need to use epressLayout
app.use(expressLayout);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error in listen method:${err}`);
        return;
    }
    console.log(`Server running successfully on port:${port}`);
})