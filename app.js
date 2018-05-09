const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const router = require('./router');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(bodyParser());

app.use(router.routes());

app.listen(PORT, () => {
  console.log('Service started at port ' + PORT);
});
