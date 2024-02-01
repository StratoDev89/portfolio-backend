import { CreateProjectDto, ProjectEntity, UpdateProjectDto } from "..";

export abstract class ProjectDatasource {
  abstract create(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
  abstract get(id: string): Promise<ProjectEntity>;
  abstract getAll(): Promise<ProjectEntity[]>;
  abstract update(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity>;
  abstract delete(id: string): Promise<ProjectEntity>;
}
