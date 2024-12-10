import { HashPassword } from "@/helpers/BcryptPassword";
import ConnectToDB from "@/helpers/ConnectToDB";
import { userModel } from "@/models/userModel";
import { createJWT } from "@/helpers/JsonWebToken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { email, password } = req.body;

  //! connect to database
  try {
    await ConnectToDB();
  } catch (error) {
    console.log("Can't connect to database!");
    console.log(error);
    return res.status(500).json({
      status: "FAILED",
      message: "Can't connect to database!",
    });
  }
  //! end connect to database

  //! inputs validation
  if (!email || !password) {
    return res.status(422).json({
      error: !email && !password ? "invalidData" : !email ? "invalidEmail" : "invalidPassword",
      status: "FAILED",
      message: "Please enter valid value!",
    });
  }
  //! end inputs validation

  //! check user email && create user in database
  const user = await userModel.findOne({ email });
  if (user) {
    res.status(422).json({
      status: "FAILED",
      message: "User with this email exist, please login.",
      error: "userExist",
    });
  } else {
    const hashedPassword = await HashPassword(password);
    try {
      await userModel.create({ email, password: hashedPassword });
      console.log("User created.");
      //! JWT and cookie
      const token = createJWT({ email }, process.env.JWT_SECRET_KEY);
      res
        .status(200)
        .setHeader(
          "Set-Cookie",
          serialize("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60,
            path: "/",
          })
        )
        .json({ status: "SUCCESS", message: "User created.", data: { email } });
      //! end JWT and cookie
    } catch (error) {
      console.log("Can't create user!");
      console.log(error);
      return res.status(500).json({ status: "FAILED", message: "Can't create user." });
    }
  }
  //! end check user email
}
