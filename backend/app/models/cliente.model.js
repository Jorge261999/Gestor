module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
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
    return Cliente;
  };
  