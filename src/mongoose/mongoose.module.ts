import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseService } from './mongoose.service';
import { buildMongoOptions } from './mongo-options';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/dev',
      { ...buildMongoOptions(), dbName: 'auth' }
    ),
  ],
  providers: [MongooseService],
  exports: [MongooseService],
})
export class CustomMongooseModule {}
