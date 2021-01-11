const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = model("Record", schema);
