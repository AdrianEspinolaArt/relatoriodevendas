import { Schema } from 'mongoose';

export const ExampleSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
