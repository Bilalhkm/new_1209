const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const weatherSchema = new Schema({
  city: { type: String, required: true },
});
mongoose.set("strictQuery", true);
module.exports = mongoose.model("weather", weatherSchema);
