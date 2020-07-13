import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { StoriesModule } from '../stories.module';
import { AppConstantsEnum } from '../../app-constants.enum';
const dotenv = require('dotenv');
dotenv.config({ path: __dirname +'/.env.test' });

describe('StoriesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [StoriesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(`${AppConstantsEnum.base}/${AppConstantsEnum.version}`);
    app.enableCors({
      origin: '*',
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(process.env.NODE_PORT || 3000);
  });

  it(' (GET) /api/v1/stories', () => {
    return request(app.getHttpServer())
      .get('/api/v1/stories')
      .expect(200)
      .expect('Hello World!');
  });
});
