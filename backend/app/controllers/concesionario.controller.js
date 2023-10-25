// Importar dependencias
const db = require("../models");
const Concesionario = db.concesionarios;
const Op = db.Sequelize.Op;
// Crear un nuevo concesionario
exports.create = (req, res) => {
  // Validar consulta
if (!req.body.id_concesionario) {
    res.status(400).send({
    message: "Content can not be empty!"
  });
  return;
}
// Crear un concesionario
const concesionario= {
  id_concesionario: req.body.id_concesionario,
  nombre: req.body.nombre,
  direccion: req.body.direccion
};
// Guardar en base de datos
Concesionario.create(concesionario)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Error al crear un nuevo concesionario"
     });
   });
 
};
// Retornar los concesionarios de la base de datos.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    Concesionario.findAll({ where: condition })
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
// Buscar un Concesionario por su id
exports.findOne = (req, res) => {
    const id_concesionario = req.params.id_concesionario;
    Concesionario.findByPk(id_concesionario)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el concesionario.`
                });
             }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
    
};
// actualizar un concesionario por su id
exports.update = (req, res) => {
    const id_concesionario = req.params.id_concesionario;
    Concesionario.update(req.body, {
        where: { id_concesionario: id_concesionario }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Concesionario actualizado."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el concesionario`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en actualización"
            });
        });
    
};
// eliminar un concesionario por su id
exports.delete = (req, res) => {
    const id_concesionario = req.params.id_concesionario;
    Concesionario.destroy({
        where: { id_concesionario: id_concesionario }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Concesionario eliminado"
                });
            } else {
                res.send({
                    message: `Concesionario no encontrado`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar al concesionario"
            });
        });
    
};
// eliminar a todos los concesionario
exports.deleteAll = (req, res) => {
    Concesionario.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} concesionarios eliminados!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error al eliminar a todos los concesionarios."
            });
        });
    
};