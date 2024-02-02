import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },

  techs: {
    type: String,
    required: [true, "techs is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
});

projectSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const ProjectModel = mongoose.model("Project", projectSchema);
