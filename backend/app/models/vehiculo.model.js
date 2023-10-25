module.exports = (sequelize, Sequelize) => {
    const Vehiculo = sequelize.define("vehiculo", {
      id_vehiculo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      estado: {
        type: Sequelize.STRING
      }

    });
    return Vehiculo;
  };
