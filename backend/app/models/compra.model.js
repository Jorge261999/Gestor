module.exports = (sequelize, Sequelize) => {
    const Compra = sequelize.define("compra", {
      id_compra: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    });
    return Compra;
  };