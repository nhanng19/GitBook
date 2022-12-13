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
    verified: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // requests: [
    //   {
    //     type: Array,
    //     default: [],
    //   },
    // ],
    // search: [
    //   {
    //     user: {
    //       type: Schema.Types.ObjectId,
    //       ref: "User",
    //     },
    //   },
    // ],
    details: {
      bio: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
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
      github: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
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

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
})
userSchema.virtual('followerCount').get(function () {
  return this.followers.length;
})
userSchema.virtual('followingCount').get(function () {
  return this.followings.length;
})
userSchema.virtual('projectCount').get(function () {
  return this.projects.length;
})
userSchema.virtual('birthDate').get(function () {
  return `${this.bMonth}/${this.bDay}/${this.bYear}`
})

const User = model("User", userSchema);

module.exports = User;
