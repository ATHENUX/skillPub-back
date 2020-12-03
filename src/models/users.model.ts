import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import uniqued from "mongoose-unique-validator";

const emailMatch = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, "Email is not valid"];

const GenderValues = ["M", "F", "Other"];

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailMatch,
      unique: true,
    },
    avatar: {
      type: String,
    },
    banner: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    firstName: {
      type: String,
      required: [true, "Fist name is required"],
    },
    password: {
      type: String,
      minlength: [6, "Very small password"],
      required: [true, "Password is requered"],
    },
    phone: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: { values: GenderValues, massage: "option is not valid" },
    },
    location: {
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 },
    },
    active: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      maxlength: [60, "too big a description"],
    },
    postsList: [
      {
        type: Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    savedposts: [
      {
        type: Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    sharedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    groupsList: [
      {
        type: Schema.Types.ObjectId,
        ref: "groups",
      },
    ],
    listOfAptitudes: [
      {
        type: Schema.Types.ObjectId,
        ref: "aptitudes",
      },
    ],
    follower: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    state: {
      type: String,
      default: "missing settings",
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.plugin(uniqued, { message: "Error,expected {PATH} to be unique" });

usersSchema.methods.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

usersSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const Users = model("users", usersSchema);

export default Users;
