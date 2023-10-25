// Importar dependencias

const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;



// Crear un nuevo Cliente
exports.create = (req, res) => {
    // Validar consulta
    console.log(req.body)
    if (!req.body.rut) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Cliente
    const cliente= {
        rut: req.body.rut,
        nombre: req.body.nombre,
        telefono: req.body.telefono
    };
    // Guardar en base de datos
    Cliente.create(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Error al crear un nuevo Cliente"
            });
        });
};


// Retornar todos los Clientes de la base de datos.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    Cliente.findAll({ where: condition })
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
// Buscar un Usuario por su rut
exports.findOne = (req, res) => {
    const rut = req.params.rut;
    Cliente.findByPk(rut)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró al Cliente.`
                });
             }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
};
// actualizar un Cliente por su rut
exports.update = (req, res) => {
    const rut = req.params.rut;
    Cliente.update(req.body, {
        where: { rut: rut }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cliente actualzado."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el Cliente`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en actualización"
            });
        });
};
// eliminar un Cliente por su rut
exports.delete = (req, res) => {
    const rut = req.params.rut;
    Cliente.destroy({
        where: { rut: rut }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cliente eliminado"
                });
            } else {
                res.send({
                    message: `Cliente no encontrado`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar el Cliente"
            });
        });
};
// eliminar a todos los Clientes
exports.deleteAll = (req, res) => {
    Cliente.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Clientes eliminados!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error al eliminar a todos los Clientes."
            });
        });
};