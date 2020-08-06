const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("data", DataSchema);
