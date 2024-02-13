import { UUIDAdapter, envs } from "../../../config";

export const data = {
  email: envs.CLIENT_EMAIL,
  username: UUIDAdapter.v4(),
  password: UUIDAdapter.v4(),
};
