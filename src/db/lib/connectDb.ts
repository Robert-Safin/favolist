import mongoose from "mongoose";

export const connectDB = async() => {
  const mongoPassword = process.env.MONGO_PASSWORD;
  const mongoUser = process.env.MONGO_USER;
  const mongoCluster = process.env.MONGO_CLUSTER;
  const mongoDatabase = process.env.MONGO_DATABASE;
  const connectionString = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}.ruawe0b.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority&connectTimeoutMS=30000`

  const client = await mongoose.connect(connectionString)
  console.log('connected to mongo');


  return client
}
