import { Injectable } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto, ChangePasswordDto } from 'src/models/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person, User } from 'src/models/entities';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private jwtService: JwtService,
    private mailService: MailService
  ) { }

  async validateUser(loginDto: LoginUserDto) {
    const result = await this.userRepository.find({ email: loginDto.email });
    if (result.length <= 0) {
      return { message: 'Correo incorrecto' };
    } else {
      if (await compare(loginDto.password, result[0].password)) {
        return this.login(result[0]);
      } else {
        return { message: 'Contraseña incorrecta' };
      }
    }
  }

  async login(user: any) {
    const payload = { id: user.id, username: user.username, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload
    };
  }

  async changePassword(changePassword: ChangePasswordDto, username: string) {
    if (changePassword.newPassword !== changePassword.repeatNewPassword) {
      return { message: 'Las contraseñas no coinciden' };
    } else {
      const user = await this.userRepository.findOne({ username: username });
      if (!user) {
        return { message: 'No se encontró usuario' };
      } else {
        if (await compare(changePassword.oldPassword, user.password)) {
          user.password = await hash(changePassword.newPassword, 10);
          const result = await this.userRepository.save(user);
          if (result) {
            await this.mailService.sendChangePasswordConfirmation(username, user.email);
            return { message: 'Contraseña cambiada con éxito.' };
          } else {
            return { message: 'Error' };
          }
        } else {
          return { message: 'Contraseña incorrecta' };
        }
      }
    }
  }

  async newRandomPassword(email: string) {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      return { message: 'No se encontró usuario' };
    } else {
      let randomPass = this.makeRandomKeyPassword(5);
      user.password = await hash(randomPass, 10);
      console.log(randomPass);
      const result = await this.userRepository.save(user);
      if (result) {
        await this.mailService.sendRandomPasswordConfirmation(randomPass, user.email);
        return { message: 'La nueva contraseña ha sido enviada a su correo.' };
      } else {
        return { message: 'Error' };
      }
    }
  }

  async register(userDto: RegisterUserDto) {

    //Creamos una persona
    const newPerson = await this.personRepository.insert({
      address: userDto.address,
      born_date: userDto.born_date,
      city: {
        code: userDto.city_code
      },
      document_number: userDto.document_number,
      document_type: userDto.document_type,
      gender: userDto.gender,
      lastname: userDto.lastname,
      name: userDto.name
    })

    if (newPerson) {
      console.log(newPerson)
      const newUser = await this.userRepository.insert({
        email: userDto.email,
        username: userDto.username,
        password: await hash(userDto.password, 10),
        photo: userDto.photo,
        person: {
          id: newPerson.generatedMaps[0].id
        }
      });
      return newUser;
    } else {
      return "Error";
    }
  }

  makeRandomKeyPassword = (length) => {
    var result = '';
    var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
