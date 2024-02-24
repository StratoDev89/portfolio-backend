import Joi from "joi";

export class JoiAdapter {
  private static title = Joi.string();
  private static description = Joi.string();
  private static techs = Joi.string();
  private static charge = Joi.string();
  private static projectUrl = Joi.string();
  private static image = Joi.any();
  private static url = Joi.string();
  private static username = Joi.string();
  private static password = Joi.string();
  private static email = Joi.string().email({ tlds: { allow: false } });

  static validateCreateProjectSchema(data: any) {
    const schema = Joi.object({
      title: this.title.required(),
      description: this.description.required(),
      techs: this.techs.required(),
      charge: this.charge.required(),
      projectUrl: this.projectUrl.required(),
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
      url: this.url.required(),
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
      charge: this.charge,
      projectUrl: this.projectUrl,
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

  static validateUpdateUserSchema(data: any) {}

  static validateLoginUserSchema(data: any) {
    const schema = Joi.object({
      username: this.username.required(),
      password: this.password.required(),
    });

    const { error } = schema.validate(data);
    if (error) {
      return [false, error.message];
    }

    return [true, undefined];
  }

  static validateEmail(data: any) {
    const schema = Joi.object({
      email: this.email.required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return [false, error.message];
    }

    return [true, undefined];
  }

  static validatePassword(data: any) {
    const schema = Joi.object({
      password: this.password.required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return [false, error.message];
    }

    return [true, undefined];
  }
}
