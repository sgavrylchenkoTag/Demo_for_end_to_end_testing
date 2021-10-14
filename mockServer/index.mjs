import Koa from 'koa';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
import router from './routes.mjs';

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error.status) { // User error
      ctx.body = error.message;
      ctx.status = error.status;
    } else { // Server error
      ctx.body = 'Unexpected server error';
      ctx.status = 500;
      console.error(error.message, error.stack);
    }
  }
});

app.use(cors({
  origin: 'http://localhost:6289',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => console.log(
  'Server has been successfully started on http://localhost:3000',
));
