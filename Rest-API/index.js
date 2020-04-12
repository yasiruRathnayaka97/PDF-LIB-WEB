const express=require('express');
const bodyParser=require('body-parser');
const accRoute=require('./App/Routes/AccountRoute');
const pdfRoute=require('./App/Routes/PDFUploadDownloadRoute');
const searchRoute=require('./App/Routes/SearchRoute');
const config=require('dotenv').config();
var cors = require('cors');
 

const app=express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(cors())
app.use( bodyParser.urlencoded( {
    extended: true
} ) );

app.use( bodyParser.json() );
app.use('/PDF-Library/Account',accRoute);
app.use('/PDF-Library/PDF',pdfRoute);
app.use('/PDF-Library/Searcher',searchRoute);
server.listen(process.env.SERVER_PORT);
io.on('connection', ()=> {
    console.log('done');
   
  });