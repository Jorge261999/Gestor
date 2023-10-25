// Importar dependencias
const db = require("../models");
const Compra = db.compras;
const Cliente = db.clientes;
const Vehiculo = db.vehiculos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.id_compra) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    promise = [
        Cliente.findByPk(req.body.rut),
        Vehiculo.findByPk(req.body.id_vehiculo)
    ]
    Promise.all(promise)
        .then(result => {
            console.log(req.body.id_compra)
            Compra.create({
                    id_compra: req.body.id_compra,
                    rut: result[0].rut,
                    id_vehiculo: result[1].id_vehiculo

                })
                .then(sale => {
                    res.send(sale);
                })
                .catch(err => {
                    res.status(500).send({
                    message:
                        err.message || "Error al crear una compra"
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
    Compra.findAll({ where: {} })
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
// Buscar una compra por su id
exports.findOne = (req, res) => {
    const id_compra = req.params.id_compra;
    Compra.findByPk(id_compra)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la compra.`
                });
             }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
};
// actualizar una compra por su id
exports.update = (req, res) => {
    const id_compra = req.params.id_compra;
    Compra.update(req.body, {
        where: { id_compra: id_compra }
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
// Eliminar compra por su id
exports.delete = (req, res) => {
    const id_compra = req.params.id_compra;
    Compra.destroy({
        where: { id_compra: id_compra }
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
// eliminar todas las compras 
exports.deleteAll = (req, res) => {
    Compra.destroy({
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