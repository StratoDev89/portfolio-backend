import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: true,
  },
  url: {
    type: String,
    required: [true, "image url is required"],
  },
});

certificationSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const CertificationModel = mongoose.model(
  "Certification",
  certificationSchema
);
