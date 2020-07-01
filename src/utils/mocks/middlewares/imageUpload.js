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

const mockImageUpload = (req, res, next) => {

}
