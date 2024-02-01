import { CreateProjectDto } from "../..";

export interface UpdateProjectDto extends Partial<CreateProjectDto> {
  readonly id: string;
}
