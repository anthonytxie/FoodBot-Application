const mongoose = require("mongoose");
const { Schema } = mongoose;

const linkSchema = new Schema({
  linkType: String
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;