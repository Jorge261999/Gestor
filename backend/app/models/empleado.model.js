module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define("empleado", {
      rut: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      cargo: {
        type: Sequelize.STRING
      }
    });
    return Empleado;
  };
  