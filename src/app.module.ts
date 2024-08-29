import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {dirname, extname, join} from 'path';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { ProfileModule } from './profile/profile.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadModule } from './uploads/upload.module';
import { diskStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.host,
      port: +config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.name,
      entities: [`${__dirname}/**/*.entity.{ts,js}`],
      migrations:[`${__dirname}/**/migrations/*.js`],
      migrationsRun: true,
      synchronize: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '../uploads')
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    ProductModule,
    CategoryModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
