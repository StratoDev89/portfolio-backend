import multer from "multer";

export class MulterAdapter {
  static filesStorage = multer.memoryStorage();

  static fileMiddelware() {
    return multer({
      storage: this.filesStorage,
    });
  }
}