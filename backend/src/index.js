const express = require('express');
const morgan = require('morgan');
const path =require('path');
const cors = require('cors');
const routes = require('./routes/index.routes');
const {mongoose} = require('./db');
const app = express();


//config
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
app.use(cors())
app.use(express.json());


// routes
app.use('/api',routes)



//server
app.listen(app.get('port'),()=>{
    console.log(`server in port ${app.get('port')}`);
})