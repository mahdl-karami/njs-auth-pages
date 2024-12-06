import ConnectToDB from "@/helpers/ConnectToDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

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

  //! check user email 

  //! end check user email 
}
