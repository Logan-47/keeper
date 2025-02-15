import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { Folder, FolderState } from "../db/entities";

export class FolderDataProvider {
  

  private queryBuilder() {
    return AppDataSource.getRepository(Folder);
  }

  private folderEntity: Repository<Folder>;

  constructor() {
    this.folderEntity = this.queryBuilder();
  }


  create = async (data: {name: string, userId: number}) => {
    const { name, userId } = data;
    
    const lastFolder = await this.folderEntity.findOne({
      where: {
        user: {
          id: userId
        }
      },
      order: { position: 'DESC'}
    })

    const folder = this.folderEntity.create({
      name: name,
      user: {
        id: userId
      },
      position: (lastFolder) ? lastFolder.position + 1 : 0
    });
    return this.folderEntity.save(folder);
  }

  update = async (id: number, data: { name: string, state: string }) => {
    const { name, state } = data;
    const folder = await this.folderEntity.findOne({
      where:{ id }
    });
    if(name) folder.name = data.name;
    if(state) folder.state = FolderState[state];
    return this.folderEntity.save(folder);
  }

  find = async (id: number, userId ?: number) =>  {
    const where = { 
      id: id,
      ...(userId && {user: { id: userId }})
    }

    return this.folderEntity.findOne({ where, relations: ["items"] });
  }

  findOneById = async (id: number) => {
    return this.folderEntity.findOne({  where: {id}, relations: ["user"] });
  }

  findAllFoldersByUserId = async (userId: number) => {
    return this.folderEntity.find(
      { 
        where: {
          user: { id: userId }
        },
        relations: ["items"]
      });
  }

  deleteFolder = async (id: number, userId: number) => {
    const response = await this.folderEntity.delete({
      id,
      user: {
        id: userId
      },
    });
    return response.affected > 0;
  }

  findByName = async (userId: number, name: string) => {
    const folder = await this.folderEntity.findOne({
      where: {
        name,
        user: {
          id: userId
        }
      },
      relations: ["items"]
    })

    return folder;
  }

  updatePosition = async (folderId: number, userId: number, position: number) => {
    const item = await this.folderEntity.findOne({
      where: {
        id: folderId,
        user: {
          id: userId
        }
      }
    })

    item.position = position;
    return this.folderEntity.save(item);
  }


}