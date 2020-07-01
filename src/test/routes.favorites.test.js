/* eslint-disable no-undef */
const proxyquire = require('proxyquire')
const assert = require('assert')

const testServer = require('../utils/testServer')
const { favoritesResultMock, favoritesServiceMock } = require('../utils/mocks/favorites')

const testPayload = {
  userId: '5efa3e942d3d4d0e337e8e0c',
  placeId: '5efa39fc26abed064502babe'
}

describe('Routes -> Favorites', () => {
  const route = proxyquire('../routes/favorites.js', {
    '../services/favorites': favoritesServiceMock
  })

  const request = testServer(route)

  // ? Create new favorite
  describe('POST /api/favorites', () => {
    it('Should not respond with error', done => {
      request.post('/api/favorites')
        .send(testPayload)
        .end((error, res) => {
          assert.strict.deepEqual(error, null)
          done()
        })
    })

    it('Should respond with Status 201', done => {
      request.post('/api/favorites')
        .send(testPayload)
        .expect(201, done)
    })

    it('Should respond with Content-type = application/json', done => {
      request.post('/api/favorites')
        .send(testPayload)
        .expect('Content-type', /json/, done)
    })

    it('Should respond with the right response format', done => {
      request.post('/api/favorites')
        .send(testPayload)
        .end((_error, res) => {
          const actual = res.body
          assert.strict.deepEqual(Object.keys(actual), ['data', 'message'])
          done()
        })
    })

    it('Should respond with created favorite ID', done => {
      request.post('/api/favorites')
        .send(testPayload)
        .end((_error, res) => {
          const actual = res.body
          const expected = {
            data: favoritesResultMock,
            message: 'Favorite created!'
          }

          assert.strict.deepEqual(actual, expected)
          done()
        })
    })
  })
})
