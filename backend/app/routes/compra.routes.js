module.exports = app => {
    const compra = require("../controllers/compra.controller.js");
    var router = require("express").Router();
    
    router.post("/", compra.create);
    router.get("/", compra.findAll);
    router.get("/:id_compra", compra.findOne);
    router.put("/:id_compra", compra.update);
    router.delete("/:id_compra", compra.delete);
    router.delete("/", compra.deleteAll);
    app.use('/api/compra', router);
  };
  