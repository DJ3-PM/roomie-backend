/* eslint-disable no-undef */
const assert = require('assert')
const proxyquire = require('proxyquire')

const { placesMock, placesServiceMock } = require('../utils/mocks/places')
const testServer = require('../utils/testServer')

describe('Routes -> Places', () => {
  const route = proxyquire('../routes/places.js', {
    '../services/places': placesServiceMock
  })

  const request = testServer(route)

  describe('GET /api/places', () => {
    it('Should respond with Status 200', done => {
      request.get('/api/places').expect(200, done)
    })

    it('Should respond with Content-type = json/application', done => {
      request.get('/api/places').expect('Content-type', /json/, done)
    })

    it('Should NOT respond with error', done => {
      request.get('/api/places').end((error, res) => {
        assert.strict.deepEqual(error, null)
        done()
      })
    })

    it('Should respond with an Array of Places', done => {
      request.get('/api/places').end((_error, res) => {
        assert.strict.deepEqual(res.body, {
          data: placesMock,
          message: 'Places listed!'
        })
        done()
      })
    })
  })
})
