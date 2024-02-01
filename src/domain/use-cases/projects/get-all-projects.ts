import { ProjectEntity, ProjectRepository } from "../../";

interface GetAllProjectsUseCase {
  execute(id: string): Promise<ProjectEntity[]>;
}

export class GetAllProjects implements GetAllProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  execute(): Promise<ProjectEntity[]> {
    return this.projectRepository.getAll();
  }
}
