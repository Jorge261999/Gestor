module.exports = (sequelize, Sequelize) => {
    const Mecanico = sequelize.define("mecanico", {
      rut: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.INTEGER
      }
    });
    return Mecanico;
  };
  