const mongoose = require("mongoose");


const concesionarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    direccion:{
        type:String,
        required: true
    }
});


module.exports = mongoose.model('Concesionario',concesionarioSchema);