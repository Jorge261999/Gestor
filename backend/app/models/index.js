// Importe de dependencias
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
// Inicialización de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Importa modelos a Sequelize
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.concesionarios = require("./concesionario.model.js")(sequelize, Sequelize);
db.empleados = require("./empleado.model.js")(sequelize, Sequelize);
db.vehiculos = require("./vehiculo.model.js")(sequelize, Sequelize);
db.ventas = require("./venta.model.js")(sequelize, Sequelize);
db.transacciones = require("./transaccion.model.js")(sequelize, Sequelize);


db.ventas.belongsTo(db.clientes, { foreignKey: 'rut' });
db.ventas.belongsTo(db.vehiculos, { foreignKey: 'id_vehiculo' });
db.transacciones.belongsTo(db.ventas, { foreignKey: 'id_venta' });
db.ventas.belongsTo(db.concesionarios, { foreignKey: 'id_concesionario' });

module.exports = db;