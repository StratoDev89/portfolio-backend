import {
  CreateProjectDto,
  ProjectDatasource,
  ProjectEntity,
  ProjectRepository,
  UpdateProjectDto,
} from "../../../domain";

export class ProjectRepositoryImpl implements ProjectRepository {
  constructor(private projectDatasource: ProjectDatasource) {}

  create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    return this.projectDatasource.create(createProjectDto);
  }

  get(id: string): Promise<ProjectEntity> {
    return this.projectDatasource.get(id);
  }

  getAll(): Promise<ProjectEntity[]> {
    return this.projectDatasource.getAll();
  }

  update(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    return this.projectDatasource.update(updateProjectDto);
  }

  delete(id: string): Promise<ProjectEntity> {
    return this.projectDatasource.delete(id);
  }
}
