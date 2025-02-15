import { body } from 'express-validator';
export const authValidations = {
  validateSignup: () => {
    return [
      body('email').notEmpty().isEmail().withMessage('invalid email address!'),
      body('name').notEmpty().withMessage('name cannot be Empty').isString().withMessage('name must be string'),
      body('password').notEmpty().withMessage('password is required!')
    ]
  },
}