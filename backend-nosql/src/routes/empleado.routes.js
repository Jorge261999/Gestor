const express = require("express");
const empleadoSchema = require("../models/empleado.models");

const router = express.Router();

//Crear Empleado
router.post('/empleados', (req,res) =>{
    const empleado = empleadoSchema(req.body);
    empleado
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//obtener todos los empleados
router.get('/empleados', (req,res) =>{
    empleadoSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//obtener un empleado por su rut
router.get('/empleados/:rut', (req,res) =>{
    const {rut} = req.params;
    empleadoSchema
    .findOne({ rut: rut })
    .then((data) => {
        if (data) {
            res.json(data);
        } else {
            res.json({ message: 'Empleado no encontrado' });
        }
    })
    .catch((error) => res.json({ message: error }));
});


//actualizar un empleado por su rut
router.put('/empleados/:rut', (req,res) =>{
    const {rut} = req.params;
    const {nombre,telefono,cargo} = req.body;
    empleadoSchema
        .updateOne({rut: rut},{$set: {nombre,telefono,cargo}})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//eliminar un empleado por su rut
router.delete('/empleados/:rut', (req,res) =>{
    const {rut} = req.params;
    empleadoSchema
        .deleteOne({rut: rut})
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

module.exports = router;