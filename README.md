
# Relatório de Vendas API

API desenvolvida em NestJS para relatórios de vendas, integração com bancos PostgreSQL (Prisma) e MongoDB (Mongoose), documentação Swagger e testes automatizados.

## Funcionalidades

- Consulta de planos (`/plans`)
- Consulta de compras (`/purchase`)
- Consulta de usuários (`/users`)
- Métricas de conversão (`/conversion-metrics`)
- Analytics de clientes (`/customer-analytics`)
- Health check (`/health`)

## Tecnologias

- NestJS
- Prisma (PostgreSQL)
- Mongoose (MongoDB)
- Swagger
- Jest & Supertest (testes e2e)

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` com as variáveis de conexão:

```
DATABASE_URL=postgres://usuario:senha@host:porta/banco
MONGO_URI=mongodb://usuario:senha@host:porta/banco
```

## Uso

```bash
# desenvolvimento
npm run start:dev

# produção
npm run start:prod
```

## Documentação

Acesse a documentação Swagger em:

```
http://localhost:3000/swagger
```

## Testes

```bash
# unitários
npm run test

# e2e
npm run test:e2e
```

## Estrutura de Pastas

```
src/
  prisma/         # conexão e serviço Prisma
  mongoose/       # conexão e serviço Mongoose
  dto/            # DTOs globais
  plans.service.ts
  plans.controller.ts
  ...
test/             # testes e2e
```

## Autor

Adrian Espínola

---
Projeto desenvolvido com NestJS, Prisma, Mongoose e Swagger.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
