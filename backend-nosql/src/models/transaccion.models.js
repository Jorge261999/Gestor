const mongoose = require("mongoose");

const transaccionSchema = mongoose.Schema({
    venta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venta',
        required: true
    },
    metodo: {
        type: String,
        required: true
    },
    estado:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Transaccion', transaccionSchema);
