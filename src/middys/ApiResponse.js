const handlerCodeResponse = (code, error = false) => {
  if (error) {
    return error.message === 'Unauthorized' ? 401 : 500
  }

  if (code) return code

  return 200
}

module.exports = () => ({
  after: async (handler, next) => {
    handler.response = {
      statusCode: handler.response && handlerCodeResponse(handler.response.statusCode),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allor-Credentials': true
      },
      body: JSON.stringify(handler.response.data)
    }
    next()
  },
  onError: async (handler, next) => {
    handler.response = {
      statusCode: handlerCodeResponse(500, handler.error),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allor-Credentials': true
      },
      body: JSON.stringify({
        message: handler.error.message || handler.error || 'Error'
      })
    }
    next()
  }
})