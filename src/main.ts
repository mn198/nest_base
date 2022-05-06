import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
// import MongoStore = require('connect-mongo');
// import * as session from 'express-session';
import * as express from 'express';
import { join } from 'path';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // static folder config
  app.use(
    '/static/images',
    express.static(join(process.cwd(), '/static/images')),
  );

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // cors config
  app.enableCors({
    // credentials: true,
    origin: ['http://localhost:5000', 'http://localhost'],
    methods: 'PUT, POST, PATCH, DELETE, GET',
  });

  // session config
  // app.set('trust proxy', 1);
  // app.use(
  //   session({
  //     secret: 'Viva foreverrr',
  //     resave: false,
  //     proxy: true,
  //     saveUninitialized: true,
  //     cookie: {
  //       secure: true,
  //       maxAge: 60 * 60 * 24 * 365 * 100,
  //       sameSite: 'none',
  //     },
  //     store: MongoStore.create({
  //       mongoUrl: 'mongodb://localhost:27017/teams',
  //     }),
  //   }),
  // );
  // await app.listen(process.env.PORT);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });

}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};