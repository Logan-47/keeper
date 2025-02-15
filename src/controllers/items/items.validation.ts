import { body } from 'express-validator';

export const itemValidations = {
  validateCreateItem:() => {
    return [
      body('name').notEmpty().withMessage('name is required!').isString().withMessage('name must be string!'),
      body('icon').optional().isString().withMessage('icon must be string!!'),
      body('folder_id').optional().isNumeric().withMessage('folder id must be a number!!')
    ]
  },
  validateUpdateItem: () => {
    return [
      body('name').optional().isString().withMessage('name must be string!'),
      body('icon').optional().isString().withMessage('icon must be string!')
    ]
  },
  validateMoveItemToFolder: () => {
    return [
      body('folder_id').isEmpty().withMessage("folder_id is required!").isNumeric().withMessage('folder id must be a number!')
    ]
  },
  validateItemReorder: () => {
    return [
    ]
  }
}
