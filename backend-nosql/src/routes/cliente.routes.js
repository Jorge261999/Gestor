const express = require("express");
const clienteSchema = require("../models/cliente.models");

const router = express.Router();

//Crear Cliente
router.post('/clientes', (req,res) =>{
    const cliente = clienteSchema(req.body);
    cliente
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//obtener todos los clientes
router.get('/clientes', (req,res) =>{
    clienteSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//obtener un cliente por su rut
router.get('/clientes/:rut', (req,res) =>{
    const {rut} = req.params;
    clienteSchema
    .findOne({ rut: rut })
    .then((data) => {
        if (data) {
            res.json(data);
        } else {
            res.json({ message: 'Cliente no encontrado' });
        }
    })
    .catch((error) => res.json({ message: error }));
});


//actualizar un cliente por su rut
router.put('/clientes/:rut', (req,res) =>{
    const {rut} = req.params;
    const {nombre,telefono} = req.body;
    clienteSchema
        .updateOne({rut: rut},{$set: {nombre,telefono}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//eliminar un cliente por su rut
router.delete('/clientes/:rut', (req,res) =>{
    const {rut} = req.params;
    clienteSchema
        .deleteOne({rut: rut})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

module.exports = router;