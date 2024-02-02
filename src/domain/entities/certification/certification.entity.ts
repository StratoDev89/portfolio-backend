export class CertificationEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly image: { id: string; url: string }
  ) {}

  static fromObject(object: { [key: string]: any }): CertificationEntity {
    const { id, _id, title, image } = object;

    return new CertificationEntity(id || _id, title, {
      id: image.id,
      url: image.url,
    });
  }
}
