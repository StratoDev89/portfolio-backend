import { ProjectEntity, ProjectRepository, UpdateProjectDto } from "../..";

interface UpdateProjectUseCase {
  execute(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity>;
}

export class UpdateProject implements UpdateProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  execute(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    return this.projectRepository.update(updateProjectDto);
  }
}
