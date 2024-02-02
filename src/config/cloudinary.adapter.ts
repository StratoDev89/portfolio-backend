import { v2 as cloudinary } from "cloudinary";
import { envs } from "./envs";

export class CloudinaryAdapter {
  static configure() {
    cloudinary.config({
      cloud_name: envs.CLOUD_NAME,
      api_key: envs.CLOUD_API_KEY,
      api_secret: envs.CLOUD_API_SECRET,
    });

    return cloudinary;
  }
}
