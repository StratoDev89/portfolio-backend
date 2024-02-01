import Joi  from "joi";

export class JoiAdapter {
  private static title = Joi.string();
  private static description = Joi.string();
  private static techs = Joi.string();
  private static image = Joi.any();
  private static url = Joi.string();

  static validateCreateProjectSchema(data: any) {
    const schema = Joi.object({
      title: this.title.required(),
      description: this.description.required(),
      techs: this.techs.required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return [false, error.message];
    }

    return [true, undefined];
  }

  static validateCreateCertificationSchema(data: any) {
    const schema = Joi.object({
      title: this.title.required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return [false, error.message];
    }

    return [true, undefined];
  }

  static validateUpdateProjectSchema(data: any) {
    const schema = Joi.object({
      title: this.title,
      description: this.description,
      techs: this.techs,
      image: this.image,
    });

    const { error } = schema.validate(data);

    if (error) {
      return [false, error.message];
    }

    return [true, undefined];
  }

  static validateUpdateCertificationSchema(data: any) {
    const schema = Joi.object({
      title: this.title,
      url: this.url,
    });

    const { error } = schema.validate(data);

    if (error) {
      return [false, error.message];
    }

    return [true, undefined];
  }
}
