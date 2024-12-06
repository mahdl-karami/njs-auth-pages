import mongoose from "mongoose";

export default async function ConnectToDB() {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected .");
  } else {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database.");
  }
}
