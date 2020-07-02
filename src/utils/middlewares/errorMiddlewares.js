const boom = require('@hapi/boom')

const { dev } = require('../../../config')

const withErrorStack = (error, stack) => {
  if (dev) {
    return {
      ...error,
      stack
    }
  }

  return error
}

const errorLogger = (error, req, res, next) => {
  console.log(error)
  next(error)
}

const errorWrapper = (error, req, res, next) => {
  if (!error.isBoom) {
    next(boom.badImplementation(error))
  }

  next(error)
}

const errorHandler = (error, req, res, next) => {
  const { output: { statusCode, payload } } = error
  res.status(statusCode)
  res.json(withErrorStack(payload, error.stack))
}

module.exports = {
  errorLogger,
  errorWrapper,
  errorHandler
}
