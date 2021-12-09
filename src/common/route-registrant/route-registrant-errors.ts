export class InvalidConfigError extends Error {
  constructor(config: unknown) {
    super(`invalid route config was found: ${config}`)
  }
}
