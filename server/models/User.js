import mongoose from 'mongoose';

const { Schema, model, ObjectId } = mongoose;

const User = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  name: {type: String},
  avatar: {type: String},
  sex: {type: String},
  isSmoker: {type: Boolean},
  birthDate: {type: String},
  posts: {type: [ObjectId]}
});


export default model('User', User);
