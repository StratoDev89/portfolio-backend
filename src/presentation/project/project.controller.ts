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

export class ProjectController {
  constructor(private projectRepository: ProjectRepository) {}

  create = async (req: Request, res: Response) => {
    let publicImageId: string | null = null;

    try {
      const { file, ...body } = req.body.createProjectDto;

      const image = await UploadFileService.uploadSingle(file);

      if (!image) {
        return res.status(500).json({ error: "Cloudinary error" });
      }

      publicImageId = image.id;

      const data = { ...body, image };

      const project = await new CreateProject(this.projectRepository).execute(
        data
      );
      res.status(201).json(project);
    } catch (error) {
      if (publicImageId) await UploadFileService.deleteFile(publicImageId);
      this.errorHandler(error, res);
    }
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
    const { file, ...body } = req.body.updateProjectDto;
    const id = req.params.id;
    
    const data = { ...body };

    // UPDATE FILE 

    new UpdateProject(this.projectRepository)
      .execute({ ...data, id })
      .then((project) => res.status(200).json(project))
      .catch((error) => this.errorHandler(error, res));
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const project = await new DeleteProject(this.projectRepository).execute(
        id
      );

      const publicImageId = project.image.id;

      const wasDeleted = await UploadFileService.deleteFile(publicImageId);

      res.status(200).json({ project, cloudinaryDeleted: wasDeleted });
    } catch (error) {
      this.errorHandler(error, res);
    }
  };

  private errorHandler(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
}
