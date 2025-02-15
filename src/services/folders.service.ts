import { FolderDataProvider } from "../dataProviders"

export class FolderService {
  private folderDP: FolderDataProvider;

  constructor() {
    this.folderDP = new FolderDataProvider();
  }

  create = async (userId: number, name: string) => {
    return this.folderDP.create({ userId, name });
  }

  update = async (id: number, data: {name: string, state: string}) => {
    return this.folderDP.update(id, data)
  }

  getFolder = async (folderId: number, userId ?: number) => {
    return this.folderDP.find(folderId, userId);
  }

  getAllFolders = async (userId: number) => {
    return this.folderDP.findAllFoldersByUserId(userId);
  }

  getById = async (folderId) => {
    return this.folderDP.findOneById(folderId);
  }

  getByName = async (userId: number, name: string) => {
    return this.folderDP.findByName(userId, name);
  }

  deleteFolder = async (folderId: number, userId: number) => {
    return this.folderDP.deleteFolder(folderId, userId);
  }
  
  reorderFolder = async (itemId: number, userId: number, position: number) => {
    return this.folderDP.updatePosition(itemId, userId, position);
  }

}