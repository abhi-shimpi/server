const mongoose = require("mongoose");
const express = require("express");
const ObjectId = express.ObjectId;
const mongoosePaginate = require("mongoose-paginate-v2");


var FormSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  questions:{
    type:Array
  } 
});

FormSchema.plugin(mongoosePaginate);
const Form = mongoose.model("Form", FormSchema, "Form");

module.exports = Form;