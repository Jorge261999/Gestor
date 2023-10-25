// Importar dependencias

const db = require("../models");
const Vehiculo = db.vehiculos;
const Mecanico = db.mecanicos;
const Concesionario = db.concesionarios;

const Op = db.Sequelize.Op;



// Agregar un nuevo Vehiculo
exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.id_vehiculo) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    promise = [
        Mecanico.findByPk(req.body.rut),
        Concesionario.findByPk(req.body.id_concesionario)
    ]
    Promise.all(promise)
        .then(result => {
            console.log(req.body.id_vehiculo)
            Vehiculo.create({
                    id_vehiculo: req.body.id_vehiculo,
                    rut: result[0].rut,
                    id_concesionario: result[1].id_concesionario

                })
                .then(sale => {
                    res.send(sale);
                })
                .catch(err => {
                    res.status(500).send({
                    message:
                        err.message || "Error al crear un vehiculo"
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
};



// Retornar todos los Vehiculos de la base de datos.
exports.findAll = (req, res) => {
    const id_vehiculo = req.query.id_vehiculo;
    var condition = id_vehiculo ? { id_vehiculo: { [Op.like]: `%${id_vehiculo}%` } } : null;
    Vehiculo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error en la búsqueda"
            });
        });
     
};
// Buscar un vehiculo por su id
exports.findOne = (req, res) => {
    const id_vehiculo = req.params.id_vehiculo;
    Vehiculo.findByPk(id_vehiculo)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el Vehiculo.`
                });
             }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
};
// actualizar un vehiculo por su id
exports.update = (req, res) => {
    const id_vehiculo = req.params.id_vehiculo;
    Vehiculo.update(req.body, {
        where: { id_vehiculo: id_vehiculo }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vehiculo actualzado."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el Vehiculo`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en actualización"
            });
        });
};
// eliminar un Vehiculo por su id
exports.delete = (req, res) => {
    const id_vehiculo = req.params.id_vehiculo;
    Vehiculo.destroy({
        where: { id_vehiculo: id_vehiculo }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vehiculo eliminado"
                });
            } else {
                res.send({
                    message: `Vehiculo no encontrado`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el Vehiculo"
            });
        });
};
// eliminar a todos los Vehiculos
exports.deleteAll = (req, res) => {
    Vehiculo.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Vehiculos eliminados!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error al eliminar a todos los Vehiculos."
            });
        });
};