const express = require("express");
const vehiculoSchema = require("../models/vehiculo.models");

const router = express.Router();

//Crear Vehiculo
router.post('/vehiculos', (req,res) =>{
    const vehiculo = vehiculoSchema(req.body);
    vehiculo
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//obtener todos los vehiculos
router.get('/vehiculos', (req,res) =>{
    vehiculoSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//obtener un vehiculo por su id
router.get('/vehiculos/:id', (req,res) =>{
    const {id} = req.params;
    vehiculoSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//actualizar un vehiculo por su id
router.put('/vehiculos/:id', (req,res) =>{
    const {id} = req.params;
    const {marca,precio} = req.body;
    vehiculoSchema
        .updateOne({_id: id},{$set: {marca,precio}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//eliminar un vehiculo por su id
router.delete('/vehiculos/:id', (req,res) =>{
    const {id} = req.params;
    vehiculoSchema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

module.exports = router;