const profileResultMock = '5efa462bf95c031333fa746e'

const createProfile = () => {
  return Promise.resolve(profileResultMock)
}

module.exports = {
  profileResultMock,
  profileServiceMock: {
    createProfile
  }
}
