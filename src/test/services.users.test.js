/* eslint-disable */
const assert = require('assert')
const proxyquire = require('proxyquire')

const { bcryptMock, hashStub } = require('../utils/mocks/bcrypt')

const testUser = {
  username: 'test',
  password: 'testy_test'
}

describe('Services -> Users', () => {
  const usersService = proxyquire('../services/users.js', {
    'bcrypt': bcryptMock
  })

  describe('When createUser is called', async () => {
    it('Should call hash() bcrypt method', async done => {
      usersService.createUser({ user: testUser })
      assert.strict.deepEqual(hashStub.called, true)
      done()
    })
  })
})
