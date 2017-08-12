const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,

  lastName: String,
  // this is the unique page scoped id facebook messenger gives
  PSID: {
    type: String,
    unique: true,
    dropDups: true
  },

  emails: [
    {
      type: String,
      dropDups: true
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  },

  _sessions: [
    {
      type: Schema.ObjectId,
      ref: "Session"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;