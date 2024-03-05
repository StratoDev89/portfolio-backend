import { CustomError } from "../../domain";
import { CloudinaryAdapter } from "../../config";

export class UploadFileService {
  static async uploadSingle(
    file: Express.Multer.File,

    validExtensions = ["jpg", "jpeg", "webp", "gif", "png"]
  ) {
    try {
      const extension = file.mimetype.split("/")[1];

      if (!extension || !validExtensions.includes(extension)) {
        throw CustomError.badRequest("Invalid file extension");
      }

      const result = await CloudinaryAdapter.configure().uploader.upload(
        file.path,
        function (err: any, result: any) {
          if (err) {
            throw CustomError.internalServer("Cloudinary Error");
          }

          return result;
        }
      );

      const image = { id: result.public_id, url: result.url };
      return image;
    } catch (error: any) {
      console.log({ error: error.message });
      return null;
    }
  }

  static async deleteFile(publicId: string) {
    const result = await CloudinaryAdapter.configure().uploader.destroy(
      publicId
    );

    if (result.result === "ok") {
      return true;
    }

    return false;
  }

  uploadMultiple() {}
}
