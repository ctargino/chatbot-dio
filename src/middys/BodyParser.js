const jsonBodyParser = () => ({
  before: (handler, next) => {
    handler.event.body = JSON.parse(handler.event.body)
    next()
  }
})

module.exports = jsonBodyParser