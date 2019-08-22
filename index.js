const winston=require('winston');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/prod')(app);

const PORT = process.env.PORT || 3000

const server=app.listen(PORT, () => {
    console.log(`Application is listening on ${PORT}`)
})

module.exports=server;