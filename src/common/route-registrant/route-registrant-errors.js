class InvalidConfigError extends Error {
  constructor(config) {
    super(`invalid route config was found: ${config}`)
  }
}

module.exports = {
  InvalidConfigError
}