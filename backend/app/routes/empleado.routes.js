module.exports = app => {
    const empleado = require("../controllers/empleado.controller.js");
    var router = require("express").Router();
    
    router.post("/", empleado.create);
    router.get("/", empleado.findAll);
    router.get("/:rut", empleado.findOne);
    router.put("/:rut", empleado.update);
    router.delete("/:rut", empleado.delete);
    router.delete("/", empleado.deleteAll);
    app.use('/api/empleado', router);
  };