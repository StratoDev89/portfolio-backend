import mongoose from "mongoose";

const certificationchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    unique: true,
  },
  image: {
    id: {
      type: String,
      required: [true, "image id is required"],
    },
    url: {
      type: String,
      required: [true, "image url is required"],
    },
  },
});

certificationchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const CertificationModel = mongoose.model(
  "Certification",
  certificationchema
);
