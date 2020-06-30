/* eslint-disable no-undef */
const assert = require('assert')
const proxyquire = require('proxyquire')

const { placesMock, placeMock, testId, placesServiceMock } = require('../utils/mocks/places')
const testServer = require('../utils/testServer')

describe('Routes -> Places', () => {
  const route = proxyquire('../routes/places.js', {
    '../services/places': placesServiceMock
  })

  const request = testServer(route)

  // ? GET all places tests
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

  // ? GET one place
  describe('GET /api/places/:placeId', () => {
    it('Should respond with Status 200', done => {
      request.get(`/api/places/${testId}`).expect(200, done)
    })

    it('Should respond with Content-type = application/json', done => {
      request.get(`/api/places/${testId}`).expect('Content-type', /json/, done)
    })

    it('Should NOT respond with error', done => {
      request.get(`/api/places/${testId}`).end((error, res) => {
        assert.strict.deepEqual(error, null)
        done()
      })
    })

    it('Should respond with the requested place', done => {
      request.get(`/api/places/${testId}`).end((_error, res) => {
        assert.strict.deepEqual(res.body, {
          data: placeMock,
          message: 'Place found'
        })
        done()
      })
    })
  })

  // ? DELETE a place
  describe('DELETE /api/places/:placeId', () => {
    it('Should respond with Status 200', done => {
      request.delete(`/api/places/${testId}`).expect(200, done)
    })

    it('Should respond with Content-type = application/json', done => {
      request.delete(`/api/places/${testId}`).expect('Content-type', /json/, done)
    })

    it('Should NOT respond with error', done => {
      request.delete(`/api/places/${testId}`).end((error, res) => {
        assert.strict.deepEqual(error, null)
        done()
      })
    })

    it('Should respond with deletedCount', done => {
      const expectedBody = {
        data: {
          deletedCount: 1
        },
        message: 'Place deleted'
      }
      request.delete(`/api/places/${testId}`).end((_error, res) => {
        assert.strict.deepEqual(res.body, expectedBody)
        done()
      })
    })
  })

  // TODO: POST Tests
})
