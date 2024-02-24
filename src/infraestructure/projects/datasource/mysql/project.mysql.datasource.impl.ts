import { SqlProjectEntity } from "../../../../data/mysql";
import {
  CreateProjectDto,
  CustomError,
  ProjectDatasource,
  ProjectEntity,
  UpdateProjectDto,
} from "../../../../domain";

export class ProjectMySqlDatasourceImpl implements ProjectDatasource {
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    const { title, description, techs, image, charge, projectUrl } =
      createProjectDto;

    const isProject = await SqlProjectEntity.findOne({
      where: { title: title },
    });

    if (isProject) {
      throw CustomError.badRequest("Project title already exists");
    }

    const newProject = new SqlProjectEntity();
    newProject.title = title;
    newProject.description = description;
    newProject.techs = techs;
    newProject.charge = charge;
    newProject.image = image;
    newProject.projectUrl = projectUrl;

    const project = await newProject.save();

    if (!project) {
      throw CustomError.internalServer(
        "Internal server error when saving project"
      );
    }
    return ProjectEntity.fromObject(project);
  }

  async get(id: string): Promise<ProjectEntity> {
    const project = await SqlProjectEntity.findOneBy({ id: +id });

    if (!project) {
      throw CustomError.notFound("Project not found");
    }

    return ProjectEntity.fromObject(project);
  }

  async getAll(): Promise<ProjectEntity[]> {
    const projects = await SqlProjectEntity.find();

    if (!projects) {
      throw CustomError.notFound("Project not found");
    }

    return projects.map(ProjectEntity.fromObject);
  }

  async update(updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
    const { id, ...updates } = updateProjectDto;

    await this.get(id);

    const result = await SqlProjectEntity.update(id, updates);

    if (result.affected && result.affected > 0) {
      const project = await this.get(id);

      return ProjectEntity.fromObject(project!);
    } else {
      throw CustomError.internalServer("Internal server error here");
    }
  }

  async delete(id: string): Promise<ProjectEntity> {
    const project = await this.get(id);

    const result = await SqlProjectEntity.delete(id);

    if (result.affected && result.affected > 0) {
      return ProjectEntity.fromObject(project!);
    } else {
      throw CustomError.internalServer("Internal server error");
    }
  }
}
