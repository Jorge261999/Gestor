const express = require("express");
const ventaSchema = require("../models/venta.models");

const router = express.Router();

//Crear Venta
router.post('/ventas', (req,res) =>{
    const venta = ventaSchema(req.body);
    venta
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//obtener todas las ventas
router.get('/ventas', (req,res) =>{
    ventaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//obtener una venta por su id
router.get('/ventas/:id', (req,res) =>{
    const {id} = req.params;
    ventaSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//actualizar una venta por su id
router.put('/ventas/:id', (req,res) =>{
    const {id} = req.params;
    const {vehiculo,cliente,concesionario,precio} = req.body;
    ventaSchema
        .updateOne({_id: id},{$set: {vehiculo,cliente,concesionario,precio}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//eliminar una venta por su id
router.delete('/ventas/:id', (req,res) =>{
    const {id} = req.params;
    ventaSchema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

module.exports = router;