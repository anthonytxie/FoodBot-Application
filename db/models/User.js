const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,

  lastName: String,

  profilePicture: String,
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

  phoneNumbers: [
    {
      type: String,
      dropDups: true
    }
  ],

  integrationIds: {
    bringId: {
      type: String
    }
  },

  address: String,

  roomNumber: String,

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
