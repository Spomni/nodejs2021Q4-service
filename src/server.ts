import { PORT } from './common/config'
import { logger } from "./common/logger";
import { app } from './app'

app.listen(PORT, (err: Error | null) => {

  if (err) {
   logger.error(err)
   process.exit(1)
  }

  logger.info(`App is running on http://localhost:${PORT}`)
});
