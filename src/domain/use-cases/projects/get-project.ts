import { ProjectEntity, ProjectRepository } from "../../";

interface GetProjectUseCase {
  execute(id: string): Promise<ProjectEntity>;
}

export class GetProject implements GetProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  execute(id: string): Promise<ProjectEntity> {
    return this.projectRepository.get(id);
  }
}
