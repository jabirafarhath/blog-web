const mongoose = require("mongoose");
const {User,userSchema} = require('../models/User')

const storySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default:'public',
    enum:['public','private'],
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref:User,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Story =mongoose.model("stories", storySchema);
module.exports = {Story,storySchema}
