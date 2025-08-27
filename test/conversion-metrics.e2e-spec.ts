import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ConversionMetricsController (e2e)', () => {
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

  it('/conversion-metrics (GET) deve retornar 200 e um objeto com users e orders', async () => {
    const res = await request(app.getHttpServer())
      .get('/conversion-metrics')
      .expect(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body).toHaveProperty('orders');
  });
});
