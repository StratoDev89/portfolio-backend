import path from "path";
import fs from "fs";
import { CustomError } from "../../domain";
import { UUIDAdapter } from "../../config";

export class UploadFileService {
  private static checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  static uploadSingle(
    file: Express.Multer.File,
    folder: string,
    validExtensions = ["jpg", "jpeg", "webp", "gif", "png"]
  ): string | null {
    try {
      const extension = file.mimetype.split("/").at(1);

      if (!extension || !validExtensions.includes(extension)) {
        throw CustomError.badRequest("Invalid file extension");
      }

      const destination = path.resolve(__dirname, "../../../", folder);
      const filename = `${UUIDAdapter.v4()}.${extension}`;
      const filePath = path.join(destination, filename);

      this.checkFolder(destination);

      fs.writeFileSync(filePath, file.buffer);

      return filename;
    } catch (error: any) {
      console.log({ error: error.message });
      return null
    }
  }

  static deleteFile(filename: string, folder: string) {
    const filePath = path.resolve(__dirname, "../../../", folder, filename);

    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath);
    }
  }

  uploadMultiple() {}
}
