// Importar dependencias
const db = require("../models");
const Empleado = db.empleados;
const Op = db.Sequelize.Op;
// Crear un nuevo empleado
exports.create = (req, res) => {
  // Validar consulta
if (!req.body.rut) {
    res.status(400).send({
    message: "Content can not be empty!"
  });
  return;
}
// Crear un empleado
const empleado= {
  rut: req.body.rut,
  nombre: req.body.nombre,
  telefono: req.body.telefono,
  cargo: req.body.cargo
};
// Guardar en base de datos
Empleado.create(empleado)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Error al crear un nuevo empleado"
     });
   });
 
};
// Retornar los empleados de la base de datos.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    Empleado.findAll({ where: condition })
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
// Buscar un empleado por su rut
exports.findOne = (req, res) => {
    const rut = req.params.rut;
    Empleado.findByPk(rut)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el empleado.`
                });
             }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en la búsqueda"
            });
        });
    
};
// actualizar un empleado por su rut
exports.update = (req, res) => {
    const rut = req.params.rut;
    Empleado.update(req.body, {
        where: { rut: rut }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Empleado actualizado."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el empleado`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error en actualización"
            });
        });
    
};
// eliminar un empleados por su rut
exports.delete = (req, res) => {
    const rut = req.params.rut;
    Empleado.destroy({
        where: { rut: rut }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Empleado eliminado"
                });
            } else {
                res.send({
                    message: `Empleado no encontrado`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar al empleado"
            });
        });
    
};
// eliminar a todos los empleados
exports.deleteAll = (req, res) => {
    Empleado.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} empleados eliminados!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error al eliminar a todos los empleados."
            });
        });
    
};