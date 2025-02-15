import { RequestHandler } from 'express';

const RequestWrapper = (func: unknown) => func as unknown as RequestHandler;

export default RequestWrapper;