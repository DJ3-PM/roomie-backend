// ! If places  data structure changes so does the mock

const placesMock = [
  {
    images: [
      'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593404934227.jpg',
      'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593404934253.png'
    ],
    available: true,
    furniture: [
      'sillas',
      'cosas',
      'mueble',
      'cañita'
    ],
    _id: '5ef96e0b7ed5f20a42a212b3',
    name: 'Centro de Caña',
    location: 'Mahuixtlan',
    price: 1500,
    size: 50,
    description: 'Antigua casa productora de Caña',
    profileId: '5ef81d486b354a0cc743f968',
    mainImage: 'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593404934221.jpeg',
    __v: 0
  },
  {
    images: [
      'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593406403226.jpg',
      'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593406403272.png'
    ],
    available: true,
    furniture: [
      'sillas',
      'cafe',
      'mueble',
      'sofa'
    ],
    _id: '5ef973c8c981cb0b85c89fe1',
    name: 'Hacienda Cafetalera',
    location: 'Coatepec',
    price: 3000,
    size: 100,
    description: 'Antigua casa productora de Café',
    profileId: '5ef81d486b354a0cc743f968',
    mainImage: 'https://buscando-roomie.s3.us-east-2.amazonaws.com/1593406403207.jpeg',
    __v: 0
  }
]

const testId = '5ef973c8c981cb0b85c89fe1'

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
