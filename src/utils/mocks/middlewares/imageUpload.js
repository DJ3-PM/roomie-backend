// ! NOT FINISHED
// TODO: Mock Multer AWS

const imageUpload = require('../../middlewares/imageUpload')
const sinon = require('sinon')

sinon.stub(imageUpload, 'single')
  .callsFake(() => {
    return (req, res, next) => {
      req.file = {}
      req.file.location = ''
    }
  })

// TODO:
// This function is empty
const mockImageUpload = (req, res, next) => {

}
