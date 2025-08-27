import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CustomerAnalyticsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/customer-analytics (GET) deve retornar 200 e um objeto com totalUsers', async () => {
    const res = await request(app.getHttpServer())
      .get('/customer-analytics')
      .expect(200);
    expect(res.body).toHaveProperty('totalUsers');
  });
});
