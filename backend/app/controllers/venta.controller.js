// Importar dependencias
const db = require("../models");
const Venta = db.ventas;
const Cliente = db.clientes;
const Vehiculo = db.vehiculos;
const Concesionario = db.concesionarios;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.id_venta) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    promise = [
        Cliente.findByPk(req.body.rut),
        Vehiculo.findByPk(req.body.id_vehiculo),
        Concesionario.findByPk(req.body.id_concesionario)
    ]
    Promise.all(promise)
        .then(result => {
            console.log(req.body.id_venta)
            Venta.create({
                    id_venta: req.body.id_venta,
                    rut: result[0].rut,
                    id_vehiculo: result[1].id_vehiculo,
                    id_concesionario: result[2].id_concesionario

                })
                .then(sale => {
                    res.send(sale);
                })
                .catch(err => {
                    res.status(500).send({
                    message:
                        err.message || "Error al crear una venta"
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
};

exports.findAll = (req, res) => {
    Venta.findAll({ where: {} })
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
// Buscar una venta por su id
exports.findOne = (req, res) => {
    const id_venta = req.params.id_venta;
    Venta.findByPk(id_venta)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la venta.`
                });
             }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
};
// actualizar una venta por su id
exports.update = (req, res) => {
    const id_venta = req.params.id_venta;
    Venta.update(req.body, {
        where: { id_venta: id_venta }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "actualizada."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en actualización"
            });
        });
};
// Eliminar venta por su id
exports.delete = (req, res) => {
    const id_venta = req.params.id_venta;
    Venta.destroy({
        where: { id_venta: id_venta }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "eliminada"
                });
            } else {
                res.send({
                    message: `no encontrada`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar "
            });
        });
};
// eliminar todas las ventas 
exports.deleteAll = (req, res) => {
    Venta.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums}  eliminadas!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error al eliminar todas."
            });
        });
};