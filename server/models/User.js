// dependencies
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

<<<<<<< HEAD
//import schema from Project.js
const projectSchema = require("./Project");
=======
>>>>>>> 4116f16ccd2a6a88f64ed1df9c54a37baa58562b

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
<<<<<<< HEAD
    myProjects: [projectSchema],
    url: {
      type: String, 
    },
=======
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
>>>>>>> 4116f16ccd2a6a88f64ed1df9c54a37baa58562b
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
