import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: 'root',
      database: 'root',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}