import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendChangePasswordConfirmation(username: string, email: string) {

        await this.mailerService.sendMail({
            to: email,
            subject: 'Contraseña cambiada con éxito.',
            template: './confirm_change_password',
            context: {
                username
            },
        });
    }

    async sendRandomPasswordConfirmation(password: string, email: string) {

        await this.mailerService.sendMail({
            to: email,
            subject: 'Nueva contraseña.',
            template: './new_random_password',
            context: {
                password
            },
        });
    }
}
