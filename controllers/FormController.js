const express = require("express");
const Form = require("../model/Form");

const router1 = express.Router();

// Get all forms
router1.get("/forms", (req, res) => {
  Form.find({}, (err, forms) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(forms);
  });
});

// Get a specific form
router1.get("/forms/:id", (req, res) => {
  Form.findById(req.params.id, (err, form) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(form);
  });
});

// Create a new form

router1.post("/forms", (req, res) => {
  const form = new Form(req.body);
  form.save((err, savedForm) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.json(savedForm);
  });
});

module.exports = router1;
