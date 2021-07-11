import { model, Schema } from 'mongoose';

const taskSchema = new Schema({
  nameTask: {
    type: String,
    required: true,
    trim: true,
  },
  stateTask: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
});

export default model('Task', taskSchema);
