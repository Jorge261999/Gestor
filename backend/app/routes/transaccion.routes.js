module.exports = app => {
    const transaccion = require("../controllers/transaccion.controller.js");
    var router = require("express").Router();
    
    router.post("/", transaccion.create);
    router.get("/", transaccion.findAll);
    router.get("/:id_transaccion", transaccion.findOne);
    router.put("/:id_transaccion", transaccion.update);
    router.delete("/:id_transaccion", transaccion.delete);
    router.delete("/", transaccion.deleteAll);
    app.use('/api/transaccion', router);
  };
  