const product = require("../controller/product.controller.js");

var router = require("express").Router();

// Create a new Tutorial
router.post("/", product.create);

// Retrieve all Tutorials
router.get("/", product.findAll);

// Retrieve a single Tutorial with id
router.get("/:id", product.findOne);

// Update a Tutorial with id
router.put("/:id", product.update);

// Delete a Tutorial with id
router.delete("/:id", product.delete);

// Delete all Tutorials
router.delete("/", product.deleteAll);

module.exports = router;




