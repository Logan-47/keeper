import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../db/entities";

import { IUserCreateData } from '../interfaces'

export class UserDataProvider {
  

  private queryBuilder() {
    return AppDataSource.getRepository(User);
  }

  private userEntity: Repository<User>;

  constructor() {
    this.userEntity = this.queryBuilder();
  }


  create = async (userData: IUserCreateData) => {
    const user = await this.userEntity.insert(userData);
    const id =  user.generatedMaps[0].id;
    return this.findOneById(id);
  }

  findOneById = async (id: number) => {
    const user = await this.userEntity.findOneBy({ id });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  }

  findOneByEmail = async (email: string) => {
    return this.userEntity.findOneBy({ email });
  }
}