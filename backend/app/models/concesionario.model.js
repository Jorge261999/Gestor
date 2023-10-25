module.exports = (sequelize, Sequelize) => {
    const Concesionario = sequelize.define("concesionario", {
      id_concesionario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      }
    });
    return Concesionario;
  };
  