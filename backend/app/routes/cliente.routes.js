module.exports = app => {
    const cliente = require("../controllers/cliente.controller.js");
    var router = require("express").Router();

    router.post("/", cliente.create);
    router.get("/", cliente.findAll);
    router.get("/:rut", cliente.findOne);
    router.put("/:rut", cliente.update);
    router.delete("/:rut", cliente.delete);
    router.delete("/", cliente.deleteAll);
    app.use('/api/cliente', router);
    
  };