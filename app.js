const Koa = require('koa');
const axios = require('axios');
const Router = require('koa-router');
require('dotenv').config();

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 3000;
const BASE_URL = 'https://api.capsulecrm.com/api/v2/parties?perPage=100';
const headerConfig = {
  headers: {
    Authorization: `Bearer ${process.env.CAPSULE_AUTH_TOKEN}`,
  },
};

const registrationRouter = router.get('/registration', async ctx => {
  try {
    const result = await axios.get(BASE_URL, headerConfig);
    ctx.status = 200;
    ctx.body = result.data.parties.map(company => company.name);
  } catch (err) {
    ctx.body = err;
  }
  // axios
  //   .get(BASE_URL, headerConfig)
  //   .then((result) => {
  //     res.send(result.data.parties.map(company => company.name));
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });
});

app.use(registrationRouter.routes(), registrationRouter.allowedMethods())

app.listen(PORT, () => {
  console.log('Service started at port 8080');
});
