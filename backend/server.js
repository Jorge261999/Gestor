//Importar dependencias
const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();

//configuración de cors (control de acceso)
app.use(cors())

// analizar las solicitudes de tipo de contenido - application/json
app.use(express.json());

// analizar las solicitudes de tipo de contenido - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//db
db.sequelize.sync({ alter: true }).then(() => {
    console.log(`Tablas sincronizadas`);
});


require("./app/routes/cliente.routes")(app);
require("./app/routes/vehiculo.routes")(app);
require("./app/routes/mecanico.routes")(app);
require("./app/routes/compra.routes")(app);
require("./app/routes/concesionario.routes")(app);
// ruta simple
app.get("/", (req, res) => {
  res.send('Bienvenido a mi api');
});
// Configurar puertos
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});