/*
  ? Algorithm Explanation

  When Multer S3 succesfully uploads a set of images into AWS S3
  it adds to the request object the `files` property.

  `files` is an object which contains plenty of information about the uploaded files,
  in this case, we only need the AWS S3 URL of the images we uploaded, this is stored
  in the `location` property of `files`.

  To access `location` first we need to access a property of `file` that  has the name
  of the HTML input name attribute. Hence, we  need those specific names.

  The `fields` value `imageUrlStractor` receives contains those names, and we use them to
  programatically access the objects within `files` and then access ther `location` property.

  These objects, in turn, are an array of objects but one array will always contain just one object
  and the other can have up to 8 objects, hence the mapping & accessing just the first element.

*/
const imageUrlStractor = ({ fields }) => {
  return (req, res, next) => {
    try {
      const [singleImage, multiImages] = fields
      const { files } = req

      req.body.mainImage = files[singleImage.name][0].location
      req.body.images = files[multiImages.name].map(image => image.location)

      return next()
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = imageUrlStractor
