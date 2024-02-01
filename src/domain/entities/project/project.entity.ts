export class ProjectEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly techs: string,
    public readonly image: string
  ) {}

  static fromObject(object: { [key: string]: any }): ProjectEntity {
    const { id, _id, title, description, techs, image } = object;

    //TODO VALIDATIONS

    return new ProjectEntity(id || _id, title, description, techs, image);
  }
}
