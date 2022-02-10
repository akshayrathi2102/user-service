import Express from 'express';
import bodyParser from 'body-parser';
import rTracer from 'cls-rtracer';
import { config, logging } from './config';

const NAMESPACE = 'SERVER';
const app = Express();

/** Logging */
app.use(rTracer.expressMiddleware());

app.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
  });

  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');
  logging.error(NAMESPACE, 'Path not found');
  res.status(404).json({
    message: error.message
  });
});

app.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
