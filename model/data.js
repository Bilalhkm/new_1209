const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  allData: { type: String, required: true },
});
mongoose.set("strictQuery", true);
module.exports = mongoose.model("data", dataSchema);
