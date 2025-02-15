import express from 'express'
import { IRouterBase } from "../interfaces";
import { ItemController, itemValidations } from '../controllers/items'
import ValidateRequestErrors from '../utils/validateRequestMiddleware';
import RequestWrapper from '../utils/requestWrapper';

export class ItemsRouter implements IRouterBase {

  public router = express.Router()
  private itemController = new ItemController();
  
  constructor() {
    this.initRoutes();
  }
  
  initRoutes(): void {
    this.router.post(
      '/',
      itemValidations.validateCreateItem(),
      ValidateRequestErrors(),
      RequestWrapper(this.itemController.creatItem)
    )
    
    this.router.get(
      '/',
      RequestWrapper(this.itemController.getAllItems)
    )

    this.router.get(
      '/:itemId',
      RequestWrapper(this.itemController.getItem)
    )
    
    this.router.put(
      '/:itemId',
      itemValidations.validateUpdateItem(),
      ValidateRequestErrors(),
      RequestWrapper(this.itemController.updateItem)
    )

    this.router.delete(
      '/:itemId',
      RequestWrapper(this.itemController.deleteItem)
    )

    this.router.post(
      '/:itemId/move',
      itemValidations.validateMoveItemToFolder(),
      RequestWrapper(this.itemController.moveItemToFolder)
    )

    this.router.post(
      '/reorder',
      itemValidations.validateItemReorder(),
      RequestWrapper(this.itemController.reorderItems)
    )
    
  }

}