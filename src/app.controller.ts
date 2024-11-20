import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SendGridService } from './sendgrid.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sendgridService: SendGridService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-mail')
  testMail(): void {
    this.sendgridService.sendEmail(
      'remy.sainsard@gmail.com',
      'test',
      '<p>html content</p>',
    );
  }

  @Get('test-mail-template')
  testMailTemplate() {
    this.sendgridService.sendTemplateEmail(
      'remy.sainsard@gmail.com',
      'd-371879b5a4b940ffb89baa3736d2d7f3', // Template ID
      {
        name: 'Rémy',
        otherData: 'data test',
      },
    );
  }
}
