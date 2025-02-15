import { Application, Request, Response } from "express";
import { isUserAuthenticated } from "../utils/authMiddleware";
import { ItemsRouter } from "./items.router";
import { FoldersRouter } from "./folders.router";
import { AuthRouter } from "./auth.router";


const apiPrefix = '/api/v1'
const router = (app: Application) => {
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send("App is up and running!!")
  })
  app.use(`${apiPrefix}/auth`, new AuthRouter().router)
  
  app.use(isUserAuthenticated())
  
  app.use(`${apiPrefix}/items`, new ItemsRouter().router)
  app.use(`${apiPrefix}/folders`, new FoldersRouter().router)
}

export default router;