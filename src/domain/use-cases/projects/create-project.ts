import { CreateProjectDto, ProjectEntity, ProjectRepository } from "../..";

interface CreateProjectUseCase {
  execute(createProjectDto: CreateProjectDto): Promise<ProjectEntity>;
}

export class CreateProject implements CreateProjectUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  execute(createProjectDto: CreateProjectDto) {
    return this.projectRepository.create(createProjectDto);
  }
}
