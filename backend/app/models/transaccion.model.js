module.exports = (sequelize, Sequelize) => {
    const Transaccion = sequelize.define("transaccion", {
      id_transaccion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      metodo: {
        type: Sequelize.INTEGER
      },
      estado:{
        type: Sequelize.STRING
      }
    });
    return Transaccion;
  };