const mongoose = require("mongoose");
const { Schema } = mongoose;
const schemaOptions =  require('../schemas/settings/schemaSettings');

const sessionSchema = new Schema({
  session: String,

  _user: {
    type: Schema.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  lastActiveDate: {
    type: Date,
    default: Date.now
  },

  isActive: {
    type: Boolean,
    default: true
  }
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;