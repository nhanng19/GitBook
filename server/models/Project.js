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
      require: true,
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
