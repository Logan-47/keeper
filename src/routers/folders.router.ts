import express from 'express'
import { IRouterBase } from "../interfaces";
import { FolderController, folderValidations } from '../controllers';
import RequestWrapper from '../utils/requestWrapper';
import ValidateRequestErrors from '../utils/validateRequestMiddleware';

export class FoldersRouter implements IRouterBase {

  public router = express.Router()
  private folderController = new FolderController();
  
  constructor() {
    this.initRoutes();
  }
  
  initRoutes(): void {
    this.router.post(
      '/',
      folderValidations.validateCreateFolder(),
      ValidateRequestErrors(),
      RequestWrapper(this.folderController.create)
    )

    this.router.get(
      '/',
      RequestWrapper(this.folderController.getAllFolders)
    )

    this.router.get(
      '/:folderId',
      RequestWrapper(this.folderController.getFolder)
    )
    this.router.put(
      '/:folderId',
      folderValidations.validateUpdateFolder(),
      ValidateRequestErrors(),
      RequestWrapper(this.folderController.updateFolder)
    )
    this.router.delete(
      '/:folderId',
      RequestWrapper(this.folderController.deleteFolder)
    )
    this.router.post(
      '/reorder',
      RequestWrapper(this.folderController.reorderFolders)
    )
  }

}