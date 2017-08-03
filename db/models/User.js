const mongoose = require('mongoose');
const { Schema } = mongoose;
const schemaOptions =  require('../schemas/settings/schemaSettings');

const userSchema = new Schema ({

  firstName: String,

  lastName: String,

  PSID: {
    type: String,
    unique: true,
    dropDups: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  _sessions: [{
    type: Schema.ObjectId,
    ref: "Session"
  }]
});


const User = mongoose.model('User', userSchema);

module.exports = User;