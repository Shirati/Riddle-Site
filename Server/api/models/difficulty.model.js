const { default: mongoose } = require("mongoose");

// Create a schema for Difficulty
const DifficultySchema = new mongoose.Schema({
  difficulty_riddle: String,
 
});
module.exports = mongoose.model('Difficulty', DifficultySchema);