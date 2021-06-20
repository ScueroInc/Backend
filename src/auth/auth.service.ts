import { Injectable } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto } from 'src/models/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person, User } from 'src/models/entities';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>
  ) { }

  async login(loginDto: LoginUserDto) {
    const result = await this.userRepository.find({ email: loginDto.email });
    if (result.length <= 0) {
      return { message: 'Correo incorrecto' };
    } else {
      if (await compare(loginDto.password, result[0].password)) {
        return {
          data: result[0]
        }
      }else {
        return { message: 'Contraseña incorrecta' };
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
}
