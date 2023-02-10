const mongoose = require("mongoose");
const express = require("express");
const ObjectId = express.ObjectId;
const mongoosePaginate = require("mongoose-paginate-v2");

var ResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
  name: { type: String, required: true },
  responses: [
    {
      questionText: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form.questions",
      },
      answer: mongoose.Schema.Types.Mixed,
    },
  ],
});

ResponseSchema.plugin(mongoosePaginate);
const Response = mongoose.model("Response", ResponseSchema, "Response");

module.exports = Response;
