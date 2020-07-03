const singleImageUrlStractor = (imageName = 'image') => {
  return (req, res, next) => {
    try {
      const { file } = req
      req.body[imageName] = file.location
      return next()
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = singleImageUrlStractor
