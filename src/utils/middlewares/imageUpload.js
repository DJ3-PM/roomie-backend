const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { awsAccessKey, awsSecretAccessKey } = require('../../../config')

// ? Amazon S3 Config
aws.config.update({
  secretAccessKey: awsSecretAccessKey,
  accessKeyId: awsAccessKey,
  region: 'us-east-2'
})

const s3 = new aws.S3()

// ? Multer with S3 config
const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'buscando-roomie', // name of the bucket  in S3
    acl: 'public-read', // setting to be  able to request images
    metadata: (req, file, callback) => {
      callback(null, { fieldName: file.fieldname })
    },
    key: (req, file, callback) => {
      //  This might be buggy...
      const splittedName = file.originalname.split('.')
      const extension = splittedName[splittedName.length - 1]
      callback(null, `${Date.now()}.${extension}`)
    }
  })
})

module.exports = imageUpload
