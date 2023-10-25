// Importar dependencias
const db = require("../models");
const Mecanico = db.mecanicos;
const Op = db.Sequelize.Op;
// Crear un nuevo mecanico
exports.create = (req, res) => {
  // Validar consulta
if (!req.body.rut) {
    res.status(400).send({
    message: "Content can not be empty!"
  });
  return;
}
// Crear un mecanico
const mecanico= {
  rut: req.body.rut,
  nombre: req.body.nombre,
  telefono: req.body.telefono
};
// Guardar en base de datos
Mecanico.create(mecanico)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Error al crear un nuevo mecanico"
     });
   });
 
};
// Retornar los mecanicos de la base de datos.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    Mecanico.findAll({ where: condition })
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
// Buscar un mecanico por su rut
exports.findOne = (req, res) => {
    const rut = req.params.rut;
    Mecanico.findByPk(rut)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el mecanico.`
                });
             }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
    
};
// actualizar un mecanico por su rut
exports.update = (req, res) => {
    const rut = req.params.rut;
    Mecanico.update(req.body, {
        where: { rut: rut }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Mecanico actualizado."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el mecanico`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en actualización"
            });
        });
    
};
// eliminar un mecanico por su rut
exports.delete = (req, res) => {
    const rut = req.params.rut;
    Mecanico.destroy({
        where: { rut: rut }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Mecanico eliminado"
                });
            } else {
                res.send({
                    message: `Mecanico no encontrado`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar al mecanico"
            });
        });
    
};
// eliminar a todos los mecanicos
exports.deleteAll = (req, res) => {
    Mecanico.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} mecanicos eliminados!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error al eliminar a todos los mecanicos."
            });
        });
    
};