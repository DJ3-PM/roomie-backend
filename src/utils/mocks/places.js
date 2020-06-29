// ! If places  data structure changes so does the mock

const placesMock = [
  {
    images: [
      'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593292094741.jpg',
      'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593292094768.png'
    ],
    available: true,
    furniture: [
      'sillas',
      'cosas',
      'mueble'
    ],
    _id: '5ef7b54492ba3f13e1593914',
    name: 'Súper departamento',
    location: 'Altotonga',
    price: 1500,
    size: 50,
    description: 'El merísimo centro',
    mainImage: 'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593292094736.jpeg',
    __v: 0
  },
  {
    images: [
      'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593303198308.jpg',
      'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593303198334.png'
    ],
    available: true,
    furniture: [
      'sillas',
      'cosas',
      'mueble'
    ],
    _id: '5ef7e0a4b33c9103c7a1554d',
    name: 'Súper departamento',
    location: 'Altotonga',
    price: 1500,
    size: 50,
    description: 'El merísimo centro',
    mainImage: 'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593303198304.jpeg',
    __v: 0
  }
]

const testId = '5ef7e0a4b33c9103c7a1554d'

const createPlace = async place => {
  return Promise.resolve(testId)
}

const getPlaces = async () => {
  return Promise.resolve(placesMock)
}

const getOnePlace = async ({ placeId }) => {
  return Promise.resolve(placesMock[1])
}

const deletePlace = async ({ placeId }) => {
  return Promise.resolve({ deletedCount: 1 })
}

module.exports = {
  placesMock,
  placeMock: placesMock[1],
  testId,
  placesServiceMock: {
    createPlace,
    getPlaces,
    getOnePlace,
    deletePlace
  }
}
