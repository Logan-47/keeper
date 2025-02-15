import { Request, Response } from "express";
import { FolderService } from "../../services";
import responseWrapper from "../../utils/responseWrapper";
import { getErrorMessage } from "../../utils/loggingHelper";

export class FolderController {
  private folderService: FolderService;

  constructor(){
    this.folderService = new FolderService();
  }

  private FoldersUpdatedEvent = async (userId) => {
    const folders = await this.folderService.getAllFolders(userId);
    return folders;
  }

  getAllFolders = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const userId = user.id;
      const folders = await this.folderService.getAllFolders(userId);
      const response = {
        message: "success",
        folders
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

  getFolder = async (req: Request, res: Response) => {
    try {
      const { folderId } = req.params;
      const user = req.user;
      const userId = user.id;
      const folderIdNumber = Number(folderId)
      const folder = await this.folderService.getFolder(folderIdNumber, userId)
      if(!folder) return responseWrapper.errorResponse(res, 404, "folder not found!!");
      const response = {
        message: "success",
        folder
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

  create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const user = req.user;
      const userId = user.id;
      const folder = await this.folderService.create(userId, name)

      req.io.emit("foldersUpdated",  await this.FoldersUpdatedEvent(userId));

      const response = {
        message: "success",
        folder
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

  updateFolder = async (req: Request, res: Response) => {
      try {
        const { folderId } = req.params;
        const { name, state } = req.body;
        const user = req.user;
        const userId = user.id;
        const folderIdNumber = Number(folderId);
        
        const folder = await this.folderService.getFolder(folderIdNumber, userId);
        if(!folder) return responseWrapper.errorResponse(res, 404, "folder not found!!")
        if(name) {
          const folderWithSameName = await this.folderService.getByName(userId, name);
  
          if(folderWithSameName) return responseWrapper.errorResponse(res, 404, "folder with same name alread exists!!")
        }
          
        const updatedFolder = await this.folderService.update(folderIdNumber, { name, state });
        
        req.io.emit("foldersUpdated", await this.FoldersUpdatedEvent(userId) )
        
        const response = {
          message: "success",
          item: updatedFolder
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

  deleteFolder = async (req: Request, res: Response) => {
      try {
        const { folderId } = req.params;
        const user = req.user;
        const userId = user.id;
        const folderIdNumber = Number(folderId)
        const folder = await this.folderService.getFolder(folderIdNumber, userId);
        if(!folder) return responseWrapper.errorResponse(res, 404, "folder not found!!")
        const isDeleted = await this.folderService.deleteFolder(folderIdNumber, userId);
        
        req.io.emit("foldersUpdated", await this.FoldersUpdatedEvent(userId));
        
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

  reorderFolders = async (req: Request, res: Response) => {
      try {
        const { folders } = req.body;
        const userId = req.user.id;
  
        for(const { id: folderId, position } of folders) {
          const folder = await this.folderService.getFolder(folderId, userId);
          if(!folder) return responseWrapper.errorResponse(res, 404, "folder not found!!");
          await this.folderService.reorderFolder(folderId, userId, position)
        }
        
        req.io.emit("foldersUpdated", await this.FoldersUpdatedEvent(userId))
        
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