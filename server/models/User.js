import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const User = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  name: {type: String},
  sex: {type: String},
  isSmoker: {type: Boolean},
  birthDate: {type: Date}
});


export default model('User', User);


// TODO: - ask Roma about importing Schema
