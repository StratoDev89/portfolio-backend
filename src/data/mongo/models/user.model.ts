// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, "email is required"],
//     unique: true,
//   },
//   username: {
//     type: String,
//     required: [true, "username is required"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "password is required"],
//   },
// });

// userSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret, options) {
//     delete ret._id;
//   },
// });

// export const UserModel = mongoose.model("user", userSchema);
