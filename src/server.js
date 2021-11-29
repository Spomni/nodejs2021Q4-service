const { PORT } = require('./common/config');

const { createApp }  = require('./app');

async function start() {
  
  const app = await createApp()
  
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
}

start()
