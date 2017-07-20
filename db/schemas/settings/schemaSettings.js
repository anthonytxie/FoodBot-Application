const schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
  }
};


var disciminatorOptions = {
  discriminatorKey: 'kind',    
  toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
  }
};

module.exports = {schemaOptions, disciminatorOptions};