module.exports = app => {
    const mecanico = require("../controllers/mecanico.controller.js");
    var router = require("express").Router();
    
    router.post("/", mecanico.create);
    router.get("/", mecanico.findAll);
    router.get("/:rut", mecanico.findOne);
    router.put("/:rut", mecanico.update);
    router.delete("/:rut", mecanico.delete);
    router.delete("/", mecanico.deleteAll);
    app.use('/api/mecanico', router);
  };