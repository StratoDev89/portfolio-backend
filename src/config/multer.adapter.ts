import multer from "multer";
import { UUIDAdapter } from ".";

export class MulterAdapter {
  static filesStorage = multer.diskStorage({
    filename(req, file, cb) {
      const extension = file.mimetype.split("/").at(1);
      const filename = `${UUIDAdapter.v4()}.${extension}`;

      cb(null, filename);
    },
  });

  static fileMiddelware() {
    return multer({
      storage: this.filesStorage,
    });
  }
}
