import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ConstantsEnum } from "../constants.enum";


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepository,ConstantsEnum.connectionName) private readonly userRepository:UserRepository){

    }

    async findOneUserByName(username: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne(
            {
                where: {
                    active: true,
                    email: username    
                },
                relations: ['groups','groups.scopes']
            }
        );                    
      }
    
}