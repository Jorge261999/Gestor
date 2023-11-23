const mongoose = require("mongoose");


const vehiculoSchema = mongoose.Schema({
    marca:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('Vehiculo',vehiculoSchema);