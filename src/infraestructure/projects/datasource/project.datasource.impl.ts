import { ProjectModel } from "../../../data";
import {
  CreateProjectDto,
  CustomError,
  ProjectDatasource,
  ProjectEntity,
  UpdateProjectDto,
} from "../../../domain";

export class ProjectDatasourceImpl implements ProjectDatasource {
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const isProject = await ProjectModel.findOne({
      title: createProjectDto.title,
    });

    if (isProject) {
      throw CustomError.badRequest("Project title already exists");
    }

    const project = new ProjectModel(createProjectDto);
    project.save();

    return ProjectEntity.fromObject(project);
  }

  async get(id: string): Promise<ProjectEntity> {
    const project = await ProjectModel.findById(id);

    if (!project) {
      throw CustomError.notFound("Project not found");
    }

    return ProjectEntity.fromObject(project);
  }

  async getAll(): Promise<ProjectEntity[]> {
    const projects = await ProjectModel.find();

    if (!projects) {
      throw CustomError.notFound("Project not found");
    }

    return projects.map(ProjectEntity.fromObject);
  }

  async update(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    const { id, ...updates } = updateProjectDto;

    await this.get(id);

    const project = await ProjectModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return ProjectEntity.fromObject(project!);
  }

  async delete(id: string): Promise<ProjectEntity> {
    await this.get(id);

    const project = await ProjectModel.findByIdAndDelete(id);

    return ProjectEntity.fromObject(project!);
  }
}
