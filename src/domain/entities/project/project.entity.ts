export class ProjectEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly techs: string,
    public readonly image: { id: string; url: string }
  ) {}

  static fromObject(object: { [key: string]: any }): ProjectEntity {
    const { id, _id, title, description, techs, image } = object;

    return new ProjectEntity(id || _id, title, description, techs, {
      id: image.id,
      url: image.url,
    });
  }
}
