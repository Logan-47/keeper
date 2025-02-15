import { ItemDataProvider } from "../dataProviders";
import { Folder } from "../db/entities";
import { IItemServiceCreate } from "../interfaces";
export class ItemService {
  private itemDP: ItemDataProvider;

  constructor() {
    this.itemDP = new ItemDataProvider();
  }

  create = async (data: IItemServiceCreate) => {
    return this.itemDP.create(data);
  }

  getAllItems = async(userId: number) => {
    return this.itemDP.findAllItemsByUserId(userId);
  }

  getItem = async (itemId: number, userId ?: number ) => {
    return this.itemDP.find(itemId, userId);
  }

  updateItem = async (itemId: number, userId: number, data: {[key: string]: string}) => {
    return this.itemDP.update(itemId, userId, data);
  }

  deleteItem = async (itemId: number, userId: number) => {
    return this.itemDP.delete(itemId, userId);
  }

  moveItemToFolder = async (itemId: number, folder: Folder) => {
    return this.itemDP.moveItemToFolder(itemId, folder);
  }

  reorderItem = async (itemId: number, userId: number, position: number) => {
    return this.itemDP.updatePosition(itemId, userId, position);
  }

  getById = async (itemId: number) => {
    return this.itemDP.findOneById(itemId);
  }


}