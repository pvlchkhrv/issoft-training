import mongoose from 'mongoose';

const { Schema, model, ObjectId } = mongoose;

const Post = new Schema({
  userId: {type: ObjectId, ref: 'User'},
  title: {type: String, required: true},
  images: {type: Array},
  text: {type: String},
});

export default model('Post', Post);
