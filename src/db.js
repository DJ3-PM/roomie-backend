const mongoose = require('mongoose')
const { dbUser, dbPassword, dbHost, dbName } = require('../config')

const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.Promise = global.Promise

const connect = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('🎊 [DB] Connected successfully! 🎊')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  connect
}
