// import mongoose from "mongoose";

// const projectSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, "title is required"],
//     unique: true,
//   },
//   description: {
//     type: String,
//     required: [true, "description is required"],
//   },
//   charge: {
//     type: String,
//     required: [true, "charge id is required"],
//   },
//   techs: {
//     type: String,
//     required: [true, "techs is required"],
//   },
//   image: {
//     id: {
//       type: String,
//       required: [true, "image id is required"],
//     },
//     url: {
//       type: String,
//       required: [true, "image url is required"],
//     },
//   },
//   projectUrl: {
//     type: String,
//     required: [true, "projectUrl id is required"],
//   },
// });

// projectSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret, options) {
//     delete ret._id;
//   },
// });

// export const ProjectModel = mongoose.model("Project", projectSchema);
