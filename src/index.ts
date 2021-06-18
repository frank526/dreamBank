import express from 'express';
import config from './config';
import applyRoutes from './app';
const { PORT } = config;

const app = express();

applyRoutes(app);
app.listen(PORT, () => {
    return console.log(`server is listening on ${PORT}`);
  });

export default app;
