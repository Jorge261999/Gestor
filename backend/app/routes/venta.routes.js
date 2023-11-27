module.exports = app => {
    const venta = require("../controllers/venta.controller.js");
    var router = require("express").Router();
    
    router.post("/", venta.create);
    router.get("/", venta.findAll);
    router.get("/:id_venta", venta.findOne);
    router.put("/:id_venta", venta.update);
    router.delete("/:id_venta", venta.delete);
    router.delete("/", venta.deleteAll);
    app.use('/api/venta', router);
  };
  