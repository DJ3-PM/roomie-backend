const sinon = require('sinon')

const hashStub = sinon.stub().resolves('$2b$10$fcXc1ClU9HAZ0GoRJvXOEOjJmvtRazHPjHX/03IZqjKFp0Z2Bnj.S')

const bcryptMock = {
  hash: (password, n) => {
    return hashStub(password, n)
  }
}

module.exports = {
  bcryptMock,
  hashStub
}
