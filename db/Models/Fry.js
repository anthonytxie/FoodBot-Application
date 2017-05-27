const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const frySchema = new Schema ({
  size: {
    type: String,
    enum: ['small', 'medium', 'large']
  }
});

const Fry = mongoose.model('Fry', frySchema);

module.exports = Fry