const mongoose = require("mongoose");
const express = require("express");
const ObjectId = express.ObjectId;
const mongoosePaginate = require("mongoose-paginate-v2");

// answers: [{  
//   questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'SurveyForm' },  
//   type: { type: String, required: true }, 
//   answer: [String]  
// }
// ];

var ResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  email : {type:String},
  responses: 
    {
      type:Array
    },
  
});

ResponseSchema.plugin(mongoosePaginate);
const Response = mongoose.model("Response", ResponseSchema, "Response");

module.exports = Response;
