import { Request, Response } from "express";
import {
  CreateProject,
  CustomError,
  DeleteProject,
  GetAllProjects,
  GetProject,
  ProjectRepository,
  UpdateProject,
  UpdateProjectDto,
} from "../../domain";
import { UploadFileService } from "..";
import { envs } from "../../config";

export class ProjectController {
  constructor(private projectRepository: ProjectRepository) {}

  create = async (req: Request, res: Response) => {
    const { file, ...body } = req.body.createProjectDto;
    const publicPath = "public/uploads/projects";

    const filename = UploadFileService.uploadSingle(file, publicPath);
    if (!filename) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const imageUrl = `${envs.HOST}/app/projects/${filename}`;
    const data = { image: imageUrl, ...body };

    new CreateProject(this.projectRepository)
      .execute(data)
      .then((project) => res.status(201).json(project))
      .catch((error) => {
        UploadFileService.deleteFile(filename, publicPath);
        this.errorHandler(error, res);
      });
  };

  get = (req: Request, res: Response) => {
    const { id } = req.params;

    new GetProject(this.projectRepository)
      .execute(id)
      .then((project) => res.status(200).json(project))
      .catch((error) => this.errorHandler(error, res));
  };

  getAll = (req: Request, res: Response) => {
    new GetAllProjects(this.projectRepository)
      .execute()
      .then((projects) => res.status(200).json(projects))
      .catch((error) => this.errorHandler(error, res));
  };

  update = (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body.updateProjectDto as UpdateProjectDto;

    new UpdateProject(this.projectRepository)
      .execute({ ...data, id })
      .then((project) => res.status(200).json(project))
      .catch((error) => this.errorHandler(error, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteProject(this.projectRepository)
      .execute(id)
      .then((project) => res.status(200).json(project))
      .catch((error) => this.errorHandler(error, res));
  };

  private errorHandler(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}
