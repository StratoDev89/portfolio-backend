import { CreateCertificationDto } from "../../..";

export interface UpdateCertificationDto
  extends Partial<CreateCertificationDto> {
  readonly id: string;
}
