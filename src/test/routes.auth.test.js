/* eslint-disable no-undef */
const proxyquire = require('proxyquire')
const assert = require('assert')

const { usersResultMock, usersServiceMock } = require('../utils/mocks/users')
const testServer = require('../utils/testServer')

const testPayload = {
  username: 'example@example.com',
  password: 'password1234'
}

describe('Routes -> Auth', () => {
  const route = proxyquire('../routes/auth.js', {
    '../services/users': usersServiceMock
  })

  const request = testServer(route)

  // ? Create new user
  describe('POST /api/auth', () => {
    it('Should respond with Status 201', done => {
      request.post('/api/auth/sign-up')
        .send(testPayload)
        .expect(201, done)
    })

    it('Should respond with Content-type = application/json', done => {
      request.post('/api/auth/sign-up')
        .send(testPayload)
        .expect('Content-type', /json/, done)
    })

    it('Should NOT respond with error', done => {
      request.post('/api/auth/sign-up')
        .send(testPayload)
        .end((error, res) => {
          assert.strict.deepEqual(error, null)
          done()
        })
    })

    it('Should respond with right status 200', done => {
      request.post('/api/auth/sign-up')
        .send(testPayload)
        .end((_error, res) => {
          const actual = res.body
          assert.strict.deepEqual(Object.keys(actual), ['data', 'message'])
          done()
        })
    })

    it('Should respond with created User ID', done => {
      request.post('/api/auth/sign-up')
        .send(testPayload)
        .end((_error, res) => {
          const actual = res.body
          const expected = {
            data: usersResultMock,
            message: 'User created!'
          }
          assert.strict.deepEqual(actual, expected)
          done()
        })
    })
  })

  // ? sign-in new user
  describe('POST api/auth', () => {
    it('Should respond with 401 Not user found or Incorrect Password', done => {
      request.post('/api/auth/sign-in')
        .send('')
        .expect(401, done)
    })

    it('should response 200', function (done) {
      request
        .post('/api/auth/sign-in')
        .send(testPayload)
        .set('Accept', 'application/json')
        .expect(200, done)
    })

    // it('Should respond with right status 200', done => {
    //   request.post('/api/auth/sign-in')
    //     .send(testPayload)
    //     .end((_error, res) => {
    //       const actual = res.body
    //       const expected = {
    //         data: usersResultMock,
    //         message: 'User found!'
    //       }
    //       assert.strict.deepEqual(actual, expected)
    //       done()
    //     })
    // })
  })
})
