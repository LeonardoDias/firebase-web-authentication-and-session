import config from './src/config/'

let app = null;

(() => {
  config.firebase.getFirestoreInstance();
  app = config.express.createExpressApp();
  const server = app.listen(3000, () => {
    console.log('RUNNING');
  })
  process.on('SIGINT', async function() {
    await server.close();
    process.exit();
  })
})()