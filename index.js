const express = require('express');
const app = express();
const port = 8000;

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