const db = require("../model/indexmodel");
const Customer = db.customer;
 const Op = db.Sequelize.Op;

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.c_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Customer
  const customer = {
    c_id: req.body.c_id,
    c_name: req.body.c_name,
    c_email: req.body.c_email,
    c_address: req.body.c_address,
    c_password: req.body.c_password
  };

  // Inserting Customer  in the database
  Customer.create(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer.",
      });
    });
};

//Retrieve all Customers from the database. by using http://localhost:3000/api/customer?c_name=Hadeed
exports.findAll = (req, res) => {
  const c_name = req.query.c_name;
  var condition = c_name ? { c_name: { [Op.like]: `%${c_name}%` } } : null;

  Customer.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer.",
      });
    });
};



// Find a single Customer with an id
exports.findOne = (req, res) => {
  
  const id = req.params.id;
  

  Customer.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Customer with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving customer with id=" + id,
      });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { c_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating customer with id=" + id,
      });
    });
};


// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { c_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "customer was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete customer with id=${id}. Maybe customer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete customer with id=" + id,
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} customer were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customer.",
      });
    });
};

