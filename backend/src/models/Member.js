import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      validate: {
        validator: Number.isInteger,
        message: 'Score must be an integer',
      },
    },
    department: {
      type: String,
      trim: true,
      default: '',
      maxlength: 80,
    },
    team: {
      type: String,
      trim: true,
      default: '',
      maxlength: 120,
    },
    avatar: {
      type: String,
      trim: true,
      default: '',
      maxlength: 512,
    },
  },
  {
    timestamps: true,
  }
);

memberSchema.index({ managerId: 1, createdAt: -1 });

const Member = mongoose.model('Member', memberSchema);

export default Member;
