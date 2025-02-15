import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { UserSession } from "../db/entities";

import { IUserSessionServiceCreateSession } from '../interfaces'

export class UserSessionDataProvider {
  

  private queryBuilder() {
    return AppDataSource.getRepository(UserSession);
  }

  private userSessionEntity: Repository<UserSession>;

  constructor() {
    this.userSessionEntity = this.queryBuilder();
  }


  create = async (data: IUserSessionServiceCreateSession) => {
    const session = this.userSessionEntity.create({
      user: {id: data.userId},
      token: data.token,
      expiry: data.expiry
    });
    return this.userSessionEntity.save(session);
  }

  findOneById = async (id: number) => {
    return this.userSessionEntity.findOneBy({ id });
  }

  findByToken = async (token) => {
    const session = await this.userSessionEntity.findOneBy({ token: token })
    return session;
    }
}