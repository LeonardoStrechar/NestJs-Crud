import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, userDocument } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

//POST
  //criar novo usuario
  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto)
    return user.save();
  }

//GET
  //retorna todos os usuarios
  findAll() {
    return this.userModel.find();
  }

//GET ID
  //retorna o usuario especifico pelo id
  findOne(id: string) {
    return this.userModel.findById(id)
  }

//PATCH
  // faz o update no usuario especifico por id
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate({
    //primeiro parametro
      //procurar pelo id
      _id: id,
    }, {
    //segundo parametro
      $set: updateUserDto,
    }, {
    //terceiro parametro
      new: true,
    })
  }

//DELETE
  // exclui um usuario
  remove(id: string) {
    return this.userModel.deleteOne({
      _id: id
    })
    .exec();
  }
}
