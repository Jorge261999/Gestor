const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const vehiculosRoutes = require("./routes/vehiculo.routes");

const app = express();

//middleware
app.use(express.json());
app.use('/api', vehiculosRoutes);

//routes
app.get('/', (req,res) => {
    res.send('Welcome to my API');
});

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error(error));

app.listen(9000, () => console.log('servidor listening in port',9000));