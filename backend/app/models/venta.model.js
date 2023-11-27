module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define("venta", {
      id_venta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      precio: {
        type: Sequelize.INTEGER
      }
    });
    return Venta;
  };