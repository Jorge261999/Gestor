const express = require("express");
const transaccionSchema = require("../models/transaccion.models");

const router = express.Router();

//Crear Transaccion
router.post('/transacciones', (req,res) =>{
    const transaccion = transaccionSchema(req.body);
    transaccion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//obtener todas las transacciones
router.get('/transacciones', (req,res) =>{
    transaccionSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//obtener una transaccion por su id
router.get('/transacciones/:id', (req,res) =>{
    const {id} = req.params;
    transaccionSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//actualizar una transaccion por su id
router.put('/transacciones/:id', (req,res) =>{
    const {id} = req.params;
    const {venta,metodo,estado} = req.body;
    transaccionSchema
        .updateOne({_id: id},{$set: {venta,metodo,estado}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//eliminar una transaccion por su id
router.delete('/transacciones/:id', (req,res) =>{
    const {id} = req.params;
    transaccionSchema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

module.exports = router;