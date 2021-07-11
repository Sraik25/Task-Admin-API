import { model, Schema } from 'mongoose';

const projectSchema = new Schema({
  nameProject: {
    type: String,
    required: true,
    trim: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default model('Project', projectSchema);
