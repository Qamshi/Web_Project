const order = require("../controller/order.controller.js");

var router = require("express").Router();

// Create a new Tutorial
router.post("/", order.create);

// Retrieve all Tutorials
 router.get("/", order.findAll);


// Retrieve a single Tutorial with id
router.get("/:id", order.findOne);

// Update a Tutorial with id
router.put("/:id", order.update);

// Delete a Tutorial with id
router.delete("/:id", order.delete);

// Delete all Tutorials
router.delete("/", order.deleteAll);

module.exports = router;
