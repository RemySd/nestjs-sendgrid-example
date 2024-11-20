import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendGridService } from './sendgrid.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables accessibles globalement
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SendGridService],
})
export class AppModule {}
