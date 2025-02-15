import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { Item, Folder } from "../db/entities";

import { IItemServiceCreate } from '../interfaces'

export class ItemDataProvider {
  

  private queryBuilder() {
    return AppDataSource.getRepository(Item);
  }

  private itemEntity: Repository<Item>;

  constructor() {
    this.itemEntity = this.queryBuilder();
  }


  create = async (data: IItemServiceCreate) => {
    const { name, icon, userId, folderId } = data;
    const lastItem = await this.itemEntity.findOne({
      where: {
        folder: folderId ? { id: folderId } : null
      },
      order: { position: 'DESC' }
    });

    const item = this.itemEntity.create({
      name: name,
      icon: icon,
      user: {
        id: userId
      },
      folder: folderId ? { id: folderId } : null,
      position: (lastItem) ? lastItem.position + 1 : 0
    })
    return this.itemEntity.save(item);
  }

  findOneById = async (id: number) => {
    return this.itemEntity.findOne({ where: { id}, relations: ['user'] });
  }

  find = async (itemId: number, userId ?: number) => {
    const where = {
      id: itemId,
      ...(userId && {
        user: {id: userId}
      })
    }
    return this.itemEntity.findOne({
      where,
      relations: ["folder"]
    });
  }

  update = async (itemId: number, userId: number, data: {[key: string]: string}) => {
    
    const { name, icon } = data;
    const where = { id: itemId, user: { id: userId } };
    const item = await this.itemEntity.findOne({ where });    
    if(name) item.name = name;
    if(icon) item.icon = icon;
    return this.itemEntity.save(item);
  }

  updatePosition = async (itemId: number, userId: number, position: number) => {
    const item = await this.itemEntity.findOne({
      where: {
        id: itemId,
        user: {
          id: userId
        }
      }
    })

    item.position = position;
    return this.itemEntity.save(item);
  }

  delete = async (itemId: number, userId: number) => {
    const where = { id: itemId, user: {id: userId} };
    const response =  await this.itemEntity.delete(where);
    return response.affected > 0;
  }

  findAllItemsByUserId = async (userId: number) => {
    return this.itemEntity.find({
      where: {
        user: {
          id: userId
        }
      },
      relations: ["folder"]
     })
  }

  moveItemToFolder = async (id: number, folder: Folder) => {
    const item = await this.itemEntity.findOne({ where: { id }, relations: ["folder"] }); 
    const lastFolderItem = await this.itemEntity.findOne({
      where: {
        folder: folder ? { id: folder.id }: null
      },
      order: { position: 'DESC' }
    })   
    item.folder = folder;
    if(lastFolderItem) {
      item.position = lastFolderItem.position + 1;
    } else item.position = 0;
    return this.itemEntity.save(item);
  }
}