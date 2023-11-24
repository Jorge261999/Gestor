const mongoose = require("mongoose");


const empleadoSchema = mongoose.Schema({
    rut:{
        type: Number,
        unique: true,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    telefono:{
        type:Number,
        required: true
    },
    cargo:{
        type:String,
        required: true
    }
});


module.exports = mongoose.model('Empleado',empleadoSchema);