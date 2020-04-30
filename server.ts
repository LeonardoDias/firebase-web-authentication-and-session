import config from './src/config/'
import App from './app'

config.dotenv.loadEnv()
process.env.ROOT = __dirname
let app = new App();
app.init({
  firestore: true
});
app.listen(parseInt(process.env.PORT) || 3000);
process.on('SIGINT', async function() {
  await app.close();
  process.exit();
});