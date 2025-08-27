import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseService } from './mongoose.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/dev', {
      tls: process.env.MONGO_TLS === 'true',
      tlsCAFile: process.env.MONGO_TLS_CA,
    }),
  ],
  providers: [MongooseService],
  exports: [MongooseService],
})
export class CustomMongooseModule {}
