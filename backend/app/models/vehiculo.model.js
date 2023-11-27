module.exports = (sequelize, Sequelize) => {
    const Vehiculo = sequelize.define("vehiculo", {
      id_vehiculo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      marca: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.INTEGER
      }

    });
    return Vehiculo;
  };
