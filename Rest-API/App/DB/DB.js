const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/PDF-Library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db=mongoose.connection;
db.on('error',()=>{
  console.log('Connection error!');
});
db.once('open',()=>{
  console.log('Connected succesfully!');
});
module.exports=mongoose;