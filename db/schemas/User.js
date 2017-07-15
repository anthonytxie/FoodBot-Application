const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const schemaOptions =  require('./settings/schemaSettings');

const userSchema = new Schema ({

  firstName: String,

  lastName: String,

  PSID: {
    type: String,
    unique: true
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