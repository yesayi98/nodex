import http from 'http';
import app from './src/Core/App';
import dotenv from 'dotenv'

const server = () => {
  dotenv.config()
  console.log('Starting Server...');
  const server = http.createServer((request, response) => {
    app.start(request, response).then((result) => {
      response.write(result?.toString() ?? '');
      response.end();
    }).catch((e) => {
      if (typeof e === 'object') {
        if (e.message) {
          console.log('\nMessage: ' + e.message);
        }
        if (e.stack) {
          console.log('\nStacktrace:');
          console.log('='.repeat(40));
          console.log(e.stack);
        }
      }
      response.statusCode = 400;
      response.end(e.message);
    });

  });
  const port = process.env.PORT ?? 8080;

  server.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });

  server.timeout = process.env.TIMEOUT ?? 10000;
};

export default server;