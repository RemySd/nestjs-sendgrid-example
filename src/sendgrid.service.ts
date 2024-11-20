/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendGridService {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    const msg = {
      to,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL'),
      subject,
      text,
      html,
    };

   

    try {
      await sgMail.send(msg);
      console.log('Email envoyé avec succès');
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'email:",
        error.response.body.errors,
      );
      throw new Error("Échec de l'envoi de l'email");
    }
  }

  async sendTemplateEmail(
    to: string,
    templateId: string,
    dynamicData: Record<string, any>, // Les données dynamiques à injecter dans le template
  ): Promise<void> {
    try {
      console.log(this.configService.get<string>('SENDGRID_FROM_EMAIL'));
      const response = await sgMail.send({
        from: this.configService.get<string>('SENDGRID_FROM_EMAIL'),
        to,
        templateId,
        // @ts-ignore
        dynamic_template_data: dynamicData,
      });
      console.log(response);
      console.log('Email envoyé avec succès avec le template');
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'email:",
        error.response.body.errors,
      );
      throw new Error("Échec de l'envoi de l'email");
    }
  }
}
