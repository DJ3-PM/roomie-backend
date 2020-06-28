const HostsSchema = require('../utils/schemas/hosts')

const createHost = ({ host }) => {
  const myHost = new HostsSchema(host)

  return new Promise((resolve, reject) => {
    myHost.save((error, createdHost) => {
      if (error) {
        reject(error)
      }

      resolve(createdHost.id)
    })
  })
}

module.exports = {
  createHost
}
