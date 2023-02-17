import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupApp } from './setup-app';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // app.use(cookieSession({
  //   keys: ['randomstring']
  // }));
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // small security feature
  //   })
  // );
  // await app.listen(3000);

  setupApp(app);
}
bootstrap();
