import { PluginConfig, RouteConfig } from "./route-registrant-types";

/**
 * Error to describe that a config is invalid
 */
export class InvalidConfigError extends Error {

  /**
   * Construct an Error to describe an invalid config exception
   *
   * @param config - invalid config
   */
  constructor(config: PluginConfig | RouteConfig) {
    super(`invalid route config was found: ${config}`)
  }
}
