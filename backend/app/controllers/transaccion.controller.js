// Importar dependencias
const db = require("../models");
const Venta = db.ventas;
const Transaccion = db.transacciones;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req.body)
    if (!req.body.id_transaccion) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    promise = [
        Venta.findByPk(req.body.id_venta),
    ]
    Promise.all(promise)
        .then(result => {
            console.log(req.body.id_venta)
            Transaccion.create({
                    id_transaccion: req.body.id_transaccion,
                    id_venta: result[0].id_venta,
                    metodo: req.body.metodo,
                    estado: req.body.estado

                })
                .then(sale => {
                    res.send(sale);
                })
                .catch(err => {
                    res.status(500).send({
                    message:
                        err.message || "Error al crear una transaccion"
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
    Transaccion.findAll({ where: {} })
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
// Buscar una transaccion por su id
exports.findOne = (req, res) => {
    const id_transaccion = req.params.id_transaccion;
    Transaccion.findByPk(id_transaccion)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la transaccion.`
                });
             }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
};
// actualizar una transaccion por su id
exports.update = (req, res) => {
    const id_transaccion = req.params.id_transaccion;
    Transaccion.update(req.body, {
        where: { id_transaccion: id_transaccion }
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
// Eliminar transaccion por su id
exports.delete = (req, res) => {
    const id_transaccion = req.params.id_transaccion;
    Transaccion.destroy({
        where: { id_transaccion: id_transaccion }
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
    Transaccion.destroy({
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