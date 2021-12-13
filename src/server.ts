import { PORT } from './common/config'
import { app } from './app'

app.listen(PORT, (err: Error | null) => {

  if (err) {
   console.error(err)
   process.exit(1)
  }

  console.log(`App is running on http://localhost:${PORT}`)
});
