import mongoose from 'mongoose'

const connection = () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    })
    .then(() => {
      console.info('[INFO] > MongoDB connected')
    })
    .catch((err) => {
      console.log(err)
      process.exit(1)
    })
}

export default connection
