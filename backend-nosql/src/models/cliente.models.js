const mongoose = require("mongoose");


const clienteSchema = mongoose.Schema({
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
    }
});


module.exports = mongoose.model('Cliente',clienteSchema);