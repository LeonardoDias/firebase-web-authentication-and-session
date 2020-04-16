import config from './src/config/'

let db = null;
let app = null;

(() => {
  db = config.firebase.createFirestoreDb();
  app = config.express.createExpressApp();
  const server = app.listen(3000, () => {
    console.log('RUNNING');
  })
  process.on('SIGINT', async function() {
    await server.close();
    process.exit();
  })
})()