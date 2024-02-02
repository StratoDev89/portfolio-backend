export class CertificationEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly url: string
  ) {}

  static fromObject(object: { [key: string]: any }): CertificationEntity {
    const { id, _id, title, url } = object;

    return new CertificationEntity(id || _id, title, url);
  }
}
