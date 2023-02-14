const express = require("express");
const Response = require("../model/Response");
const router = require("./UserController");

const router2 = express.Router();

// Submit a response for a specific form
// You have to give form ID
//Take responses of specific form

router2.get('/form/responses/:id', async(req, res) =>{

  try{
    // console.log("dunction called");
    const formId = req.params.id;
    const response = await Response.find({ formId });

    if(response){
      res.status(200).send(response);
    }
    else{
      res.status.apply(201).send("No response exist");
    }
  }
  catch(error){
    console.log(error);
    return null;
  }

})
router2.post("/forms/responses/:id", (req, res) => {
  const response = new Response({
    formId: req.params.id,
    email : req.body.email,
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

