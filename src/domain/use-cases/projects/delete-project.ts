import { ProjectEntity, ProjectRepository } from "../..";

interface DeleteProjectUseCase {
  execute(id: string): Promise<ProjectEntity>;
}

export class DeleteProject implements DeleteProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  execute(id: string): Promise<ProjectEntity> {
    return this.projectRepository.delete(id);
  }
}
