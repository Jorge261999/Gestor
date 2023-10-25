module.exports = app => {
    const vehiculo = require("../controllers/vehiculo.controller.js");
    var router = require("express").Router();
    
    router.post("/", vehiculo.create);
    router.get("/", vehiculo.findAll);
    router.get("/:id_vehiculo", vehiculo.findOne);
    router.put("/:id_vehiculo", vehiculo.update);
    router.delete("/:id_vehiculo", vehiculo.delete);
    router.delete("/", vehiculo.deleteAll);
    app.use('/api/vehiculo', router);
  };