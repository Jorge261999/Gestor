const express = require("express");
const concesionarioSchema = require("../models/concesionario.models");

const router = express.Router();

//Crear Concesionario
router.post('/concesionarios', (req,res) =>{
    const concesionario = concesionarioSchema(req.body);
    concesionario
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//obtener todos los concesionarios
router.get('/concesionarios', (req,res) =>{
    concesionarioSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//obtener un concesionario por su id
router.get('/concesionarios/:id', (req,res) =>{
    const {id} = req.params;
    concesionarioSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//actualizar un concesionario por su id
router.put('/concesionarios/:id', (req,res) =>{
    const {id} = req.params;
    const {nombre,direccion} = req.body;
    concesionarioSchema
        .updateOne({_id: id},{$set: {nombre,direccion}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//eliminar un concesionario por su id
router.delete('/concesionarios/:id', (req,res) =>{
    const {id} = req.params;
    concesionarioSchema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

module.exports = router;