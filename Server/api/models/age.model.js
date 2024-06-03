const { default: mongoose } = require("mongoose");

// Create a schema for Age
const AgeSchema = new mongoose.Schema({
  age_range: String, 
});
module.exports = mongoose.model('Age', AgeSchema);