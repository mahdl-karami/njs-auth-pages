import ConnectToDB from "@/helpers/ConnectToDB";
import { userModel } from "@/models/userModel";

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
  if (!email || !password) return res.status(422).json({ error: "invalidData", status: "FAILED", message: "Invalid data!" });
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
    if (user.password !== password) return res.status(422).json({ error: "incorrectPassword", status: "FAILED", message: "Email or password is incorrect!" });
    console.log("Logged in successfully.");
    res.status(200).json({ status: "SUCCESS", message: "Logged in successfully", data: { email } });
  }
}
