import { body } from 'express-validator';

export const folderValidations = {
  validateCreateFolder: () => {
    return [
      body('name').notEmpty().withMessage('name cannot be Empty').isString().withMessage('name must be string')
    ]
  },
  validateUpdateFolder: () => {
    return [
      body('name').optional().isEmpty().withMessage("name is required!").isString().withMessage("name should be string!"),
      body('state').optional().isString().withMessage("state should not be empty!!").custom((val) => {
        const states = ["OPEN", "CLOSED"];
        return states.includes(val)
      }).withMessage('invalid values for state!!')
    ]
  }
}
