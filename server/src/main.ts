import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppConstantsEnum } from "./app-constants.enum";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { ResultInterceptor } from "./common/filters/http-result-interceptor";
const dotenv = require("dotenv");
dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env",
  ".env.default": ".env.default",
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`${AppConstantsEnum.base}/${AppConstantsEnum.version}`);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResultInterceptor());
  app.enableCors({
    origin: "*",
  });
  await createOpenAPIDescription(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.NODE_PORT || 3000);
}

async function createOpenAPIDescription(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle("API")
    .setDescription("Quest api")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
}
bootstrap();
