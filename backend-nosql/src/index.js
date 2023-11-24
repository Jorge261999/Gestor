const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();
const vehiculosRoutes = require("./routes/vehiculo.routes");
const clientesRoutes = require("./routes/cliente.routes");
const concesionariosRoutes = require("./routes/concesionario.routes");
const empleadosRoutes = require("./routes/empleado.routes");
const ventasRoutes = require("./routes/venta.routes");
const transaccionesRoutes = require("./routes/transaccion.routes");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use('/api', vehiculosRoutes);
app.use('/api', clientesRoutes);
app.use('/api', concesionariosRoutes);
app.use('/api', empleadosRoutes);
app.use('/api', ventasRoutes);
app.use('/api', transaccionesRoutes);

//routes
app.get('/', (req,res) => {
    res.send('Welcome to my API');
});

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error(error));

app.listen(9000, () => console.log('servidor listening in port',9000));