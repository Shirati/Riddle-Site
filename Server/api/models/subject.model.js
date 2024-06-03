const { default: mongoose } = require("mongoose");

// Create a schema for subject
const SubjectSchema = new mongoose.Schema({
  subject_riddle: String,
 
});
module.exports = mongoose.model('Subject', SubjectSchema);