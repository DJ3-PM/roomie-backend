/* eslint-disable no-undef */

const proxyquire = require('proxyquire')
const assert = require('assert')

const { profileResultMock, profileServiceMock } = require('../utils/mocks/profile')
const testServer = require('../utils/testServer')

describe('Routes -> Profile', () => {
  const route = proxyquire('../routes/profile.js', {
    '../services/profile': profileServiceMock
  })

  const request = testServer(route)

  // ? Create new Profile
  describe('POST /api/profile', () => {
    it('Should NOT respond with error', done => {
      request.post('/api/profile')
        .field('userId', '5efd29cf2ff7b505ae60b415')
        .attach('avatar', './src/test/fixtures/profile.png')
        .end((error, res) => {
          assert.strict.deepEqual(error, null)
          done()
        })
    })

    it('Should respond with Status 201', done => {
      request.post('/api/profile')
        .field('firstname', 'test')
        .field('lastname', 'testy')
        .field('isHost', 'false')
        .field('userId', '5efd29cf2ff7b505ae60b415')
        .attach('avatar', './src/test/fixtures/profile.png')
        .expect(201, done)
    })

    it('Should respond with Content-type = application/json', done => {
      request.post('/api/profile')
        .field('firstname', 'test')
        .field('lastname', 'testy')
        .field('isHost', 'false')
        .field('userId', '5efd29cf2ff7b505ae60b415')
        .attach('avatar', './src/test/fixtures/profile.png')
        .expect('Content-type', /json/, done)
    })

    it('Should respond with created Profile ID', done => {
      request.post('/api/profile')
        .field('firstname', 'test')
        .field('lastname', 'testy')
        .field('isHost', 'false')
        .field('userId', '5efd29cf2ff7b505ae60b415')
        .attach('avatar', './src/test/fixtures/profile.png')
        .end((_error, res) => {
          const actual = res.body
          const expected = {
            data: profileResultMock,
            message: 'Profile created!'
          }
          assert.strict.deepEqual(actual, expected)
          done()
        })
    })
  })
})
