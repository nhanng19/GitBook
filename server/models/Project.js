const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      require: true,
    },
    projectDescription: {
      type: String,
      require: true,
    },
    projectRepo: {
      type: String,
    },
    projectOwner: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    task: [
      {
        type: String,
      },
    ],
    projectMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    kanban: [
      {
        todo: [],
      },
      {
        inProgress: [],
      },
      {
        done: [],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);


const Project = model("Project", projectSchema);

module.exports = Project;
