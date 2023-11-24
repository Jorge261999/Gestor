const mongoose = require("mongoose");

const ventaSchema = mongoose.Schema({
    vehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true
    },
    cliente: {
        type: Number,
        ref: 'Cliente',
        required: true
    },
    concesionario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concesionario',
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Venta', ventaSchema);
