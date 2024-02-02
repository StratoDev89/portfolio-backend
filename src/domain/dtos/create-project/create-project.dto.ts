export interface CreateProjectDto {
  readonly title: string;
  readonly description: string;
  readonly techs: string;
  readonly charge: string;
  readonly image: { id: string; url: string };
  readonly projectUrl: string;
}
