import { verifyPassword } from "@/helpers/BcryptPassword";
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
  if (!email || !password)
    return res.status(422).json({
      error: !email && !password ? "invalidData" : !email ? "invalidEmail" : "invalidPassword",
      status: "FAILED",
      message: "Please enter valid value!",
    });
  //! end inputs validation

  //! authorization
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(422).json({
      status: "FAILED",
      message: "No user is registered with this email",
      error: "userNotExist",
    });
  } else {
    const passVerify = await verifyPassword(password, user.password);
    if (!passVerify) return res.status(422).json({ error: "incorrectPassword", status: "FAILED", message: "Email or password is incorrect!" });
    //! JWT and cookie
    const token = createJWT({ email: user.email }, process.env.JWT_SECRET_KEY);
    console.log("Logged in successfully.");
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
      .json({ status: "SUCCESS", message: "Logged in successfully", data: { email } });
  }
}
