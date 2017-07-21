const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const {disciminatorOptions} =  require('./settings/schemaSettings');
const itemSchema = new mongoose.Schema({
  createdDate: {
    type: Date,
    default: Date.now
  },
  _order: {
    type: Schema.ObjectId,
    ref: 'Order'
  },
},disciminatorOptions);

itemSchema.pre('remove', function(next){
    this.model('Order').update(
        {_id: this._order}, 
        {$pull: {_items: this._id}}, 
        next
    );
}); 



module.exports = {itemSchema};