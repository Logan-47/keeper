import { FolderService, ItemService } from "../../services";
import responseWrapper from "../../utils/responseWrapper";
import { getErrorMessage } from "../../utils/loggingHelper";
import { Request, Response } from 'express';
import { Folder } from "../../db/entities";

export class ItemController {
  private itemService: ItemService;
  private folderService: FolderService

  constructor(){
    this.itemService = new ItemService();
    this.folderService = new FolderService();
  }

  private ItemsUpdatedEvent = async (userId: number) => {
    const items = await this.itemService.getAllItems(userId);
    return items;
  }

  private ItemAndFoldersUpdated = async (userId: number) => {
    const items = await this.itemService.getAllItems(userId);
    const folders = await this.folderService.getAllFolders(userId);
    return {
      updatedItems: items,
      updatedFolders: folders
    }
  }

  

  creatItem = async (req: Request, res: Response) => {
    try {
      const { name, icon, folder_id: folderId }: {
        name: string,
        icon: string,
        folder_id: number
      } = req.body;
     const user = req.user;
     const userId = user.id;
     const item = await this.itemService.create({
      name: name,
      userId,
      folderId: (folderId >= 0) ? folderId : null,
      icon
     })
     
     req.io.emit("itemsUpdated", await this.ItemsUpdatedEvent(userId))
     
     const response = {
      message: "success",
      item
     }
     return responseWrapper.successResponse(res, 200, response);
    } catch (err: unknown) {
      return responseWrapper.errorResponse(
        res,
        500,
        getErrorMessage(err),
        err
      );
    }
  }

  getAllItems = async (req: Request, res: Response) => {
    try {
     const user = req.user;
     const userId = user.id;
     const items = await this.itemService.getAllItems(userId)
     const response = {
      message: "success",
      items
     }
    return responseWrapper.successResponse(res, 200, response);
    } catch (err: unknown) {
      return responseWrapper.errorResponse(
        res,
        500,
        getErrorMessage(err),
        err
      );
    }
  }

  getItem = async (req: Request, res: Response) => {
    try {
      const { itemId } = req.params;
      const user = req.user;
      const userId = user.id;
      const itemIdNumber = Number(itemId)
      const item = await this.itemService.getItem(itemIdNumber, userId)
      if(!item) return responseWrapper.errorResponse(res, 404, "Invalid Item!!");
      const response = {
        message: "success",
        item
      }
      return responseWrapper.successResponse(res, 200, response);
    } catch (err: unknown) {
      return responseWrapper.errorResponse(
        res,
        500,
        getErrorMessage(err),
        err
      )
    } 
  }

  updateItem = async (req: Request, res: Response) => {
    try {
      const { itemId } = req.params;
      const data = req.body;
      const user = req.user;
      const userId = user.id;
      const itemIdNumber = Number(itemId);
      const item = await this.itemService.getItem(itemIdNumber, userId);
      if(!item) return responseWrapper.errorResponse(res, 404, "Item not found!!")
      const updatedItem = await this.itemService.updateItem(itemIdNumber, userId, data);
      
      req.io.emit("itemsUpdated", await this.ItemsUpdatedEvent(userId) )
      
      const response = {
        message: "success",
        item: updatedItem
      }
      return responseWrapper.successResponse(res, 200, response);
    } catch (err: unknown) {
      return responseWrapper.errorResponse(
        res,
        500,
        getErrorMessage(err),
        err
      )
    }
  }

  deleteItem = async (req: Request, res: Response) => {
    try {
      const { itemId } = req.params;
      const user = req.user;
      const userId = user.id;
      const itemIdNumber = Number(itemId)
      const item = await this.itemService.getItem(itemIdNumber, userId);
      if(!item) return responseWrapper.errorResponse(res, 404, "Item not found!!")
      const isDeleted = await this.itemService.deleteItem(itemIdNumber, userId);
      
      req.io.emit("itemsUpdated", await this.ItemsUpdatedEvent(userId));
      
      const response = {
        message: (isDeleted) ? "success": "failed"
      }
      return responseWrapper.successResponse(res, 200, response);
    } catch (err: unknown) {
      return responseWrapper.errorResponse(
        res,
        500,
        getErrorMessage(err),
        err
      )
    }
  }

  moveItemToFolder = async (req: Request, res: Response) => {
    try {
      const { itemId } = req.params;
      const { folder_id: folderId } = req.body;
      const userId = req.user.id;
      const itemIdNumber = Number(itemId)

      const item = await this.itemService.getItem(itemIdNumber, userId);
      if(!item) return responseWrapper.errorResponse(res, 404, "Item not found!!");
      let folder: Folder | null = null;
      if(folderId >= 0) {
        folder = await this.folderService.getFolder(folderId, userId);
        if(!folder) return responseWrapper.errorResponse(res, 404, "folder not found!!");
      }
      const movedItem = await this.itemService.moveItemToFolder(itemIdNumber,folder);
      req.io.emit("itemsAndFoldersUpdated", await this.ItemAndFoldersUpdated(userId))
      const response = {
        message: "success",
        item: movedItem
      }
      return responseWrapper.successResponse(res, 200, response);
     } catch (err: unknown) {
       return responseWrapper.errorResponse(
         res,
         500,
         getErrorMessage(err),
         err
       );
     }
  }

  reorderItems = async (req: Request, res: Response) => {
    try {
      const { items } = req.body;
      const userId = req.user.id;

      for(const { id: itemId, position } of items) {
        const item = await this.itemService.getItem(itemId, userId);
        if(!item) return responseWrapper.errorResponse(res, 404, "Item not found!!");
        await this.itemService.reorderItem(itemId, userId, position)
      }
      
      req.io.emit("itemsUpdated", await this.ItemsUpdatedEvent(userId))
      
      const response = {
        message: "success"
      }
      return responseWrapper.successResponse(res, 200, response);
     } catch (err: unknown) {
       return responseWrapper.errorResponse(
         res,
         500,
         getErrorMessage(err),
         err
       );
     }
  }
}