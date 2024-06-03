const { default: mongoose } = require("mongoose");

// Create a schema for User
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, require: true, match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ },
  password: { type: String, require: true },
  
});
UserSchema.statics.count=0;
module.exports = mongoose.model('User', UserSchema);