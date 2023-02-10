const express = require("express");
const Response = require("../model/Response");

const router2 = express.Router();

// Submit a response for a specific form
// You have to give form ID
router2.post("/forms/:id/responses", (req, res) => {
  const response = new Response({
    formId: req.params.id,
    name: req.body.name,
    title: req.body.title,
    responses: req.body.responses,
  });
  response.save((err, savedResponse) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(savedResponse);
  });
});

module.exports = router2;
