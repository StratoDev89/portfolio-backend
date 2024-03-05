import "reflect-metadata";
import { BcryptAdapter, NodeMailerAdapter, envs } from "../../config";
import {
  // UserModel, MongoConnection,
  data,
} from "../mongo";
import { SqlDatabaseConnection, SqlUserEntity } from "..";

export async function seed() {
  await SqlDatabaseConnection.connect();

  await main();

  await SqlDatabaseConnection.disconnect();
}

async function main() {
  const [users, count] = await SqlUserEntity.findAndCount();

  if (count === 0) {
    try {
      const userData = {
        email: data.email,
        username: data.username,
        password: "",
      };
      userData.password = BcryptAdapter.hash(data.password);

      const user = new SqlUserEntity();
      user.email = userData.email;
      user.password = userData.password;
      user.username = userData.username;

      const newUser = await user.save();

      const options = {
        to: envs.CLIENT_EMAIL,
        subject: "Login credentials",
        htmlBody: `
      <h1>Login Credentials</h1>
    <p>username:<strong>${data.username}</strong></p>
    <p>password:<strong>${data.password}</strong></p>
      `,
      };

      await NodeMailerAdapter.sendEmail(options);

      console.log("--- DATABASE SEEDED ---");

      return;
    } catch (error) {
      console.log({ error });
    }
  }

  console.log("--- DATABASE NOT SEEDED ---");
}

// export async function seed() {
//   await MongoConnection.connect({
//     mongoURL: envs.DB_URL,
//     dbName: envs.DB_NAME,
//   });

//   await main();

//   await MongoConnection.disconnect();
// }

// async function main() {
//   const count = await UserModel.find().countDocuments();

//   if (count === 0) {
//     try {
//       const userData = {
//         email: data.email,
//         username: data.username,
//         password: "",
//       };
//       userData.password = BcryptAdapter.hash(data.password);

//       const user = new UserModel(userData);

//       await user.save();

//       const options = {
//         to: envs.CLIENT_EMAIL,
//         subject: "Login credentials",
//         htmlBody: `
//       <h1>Login Credentials</h1>
//     <p>username:<strong>${data.username}</strong></p>
//     <p>password:<strong>${data.password}</strong></p>
//       `,
//       };

//       const emailSent = await NodeMailerAdapter.sendEmail(options);

//       console.log("database seeded");

//       return;
//     } catch (error) {
//       console.log({ error });
//     }
//   }

//   console.log("NOT SEEDED");
// }
