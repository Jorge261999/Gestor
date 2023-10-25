module.exports = app => {
    const concesionario = require("../controllers/concesionario.controller.js");
    var router = require("express").Router();
    
    router.post("/", concesionario.create);
    router.get("/", concesionario.findAll);
    router.get("/:id_concesionario", concesionario.findOne);
    router.put("/:id_concesionario", concesionario.update);
    router.delete("/:id_concesionario", concesionario.delete);
    router.delete("/", concesionario.deleteAll);
    app.use('/api/concesionario', router);
  };