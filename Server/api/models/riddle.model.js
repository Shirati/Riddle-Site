const { default: mongoose } = require("mongoose");

// Create a schema for Riddle
const RiddleSchema = new mongoose.Schema({
  riddlename: String,
  question: String,
  solution: [String],
  subjectId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subject' },
  difficultyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Difficulty' },
  ageId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Age' },
  image: String,
  unsatisfied:Number,
  satisfied:Number,
  certified:Boolean
});
module.exports = mongoose.model('Riddle', RiddleSchema);