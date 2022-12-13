// dependencies
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

//import schema from Project.js
const projectSchema = require("./Project");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dc2xiz0gi/image/upload/v1670957376/profileImgs/Untitled_design_4_usytaj.png",
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    gender: {
      type: String,
      trim: true,
    },
    bYear: {
      type: Number,
      trim: true, 
    },
    bMonth: {
      type: Number,
      trim: true, 
    },
    bDay: {
      type: Number,
      trim: true, 
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// mehtod to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
