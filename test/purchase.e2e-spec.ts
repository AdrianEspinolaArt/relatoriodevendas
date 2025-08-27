import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('PurchaseController (e2e)', () => {
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

  it('/purchase (GET) deve retornar 200 e um array', async () => {
    const res = await request(app.getHttpServer())
      .get('/purchase')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
