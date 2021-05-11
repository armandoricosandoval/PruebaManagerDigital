const mongoose = require('mongoose');
const {Schema} = mongoose;

const clients = new Schema({
    name: {type:String, required:true},
    cedula: {type: Number, required:true},
    phone: {type: Number, required:true},
    dir:{type:String,requiered:true}
    
});

module.exports = mongoose.model('person', clients)