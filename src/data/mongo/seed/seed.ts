import { BcryptAdapter, NodeMailerAdapter, envs } from "../../../config";
import { UserModel, MongoConnection, data } from "..";

export async function seed() {
  await MongoConnection.connect({
    mongoURL: envs.DB_URL,
    dbName: envs.DB_NAME,
  });

  await main();

  await MongoConnection.disconnect();
}

async function main() {
  const userExist = await UserModel.find().countDocuments();

  if (userExist === 0) {
    const userData = {
      email: data.email,
      username: data.username,
      password: "",
    };
    userData.password = BcryptAdapter.hash(data.password);

    const user = new UserModel(userData);
    user.save();

    const options = {
      to: envs.CLIENT_EMAIL,
      subject: "Login credentials",
      htmlBody: `
      <h1>Login Credentials</h1>
    <p>username:<strong>${data.username}</strong></p>
    <p>password:<strong>${data.password}</strong></p>
      `,
    };

    const emailSent = await NodeMailerAdapter.sendEmail(options);

    console.log("database seeded");

    return;
  }

  console.log("NOT SEEDED");
}
