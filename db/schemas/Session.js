const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const schemaOptions =  require('./settings/schemaSettings');

const sessionSchema = new Schema ({

  session: String,

  createdAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  },

});


const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;