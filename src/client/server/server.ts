import express from "express";
import { BaseRouterConfig } from "../route/base.route";

export class Server {
  private app: express.Application;

  constructor(
    private port: number,
    routers: BaseRouterConfig[],
  ) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRouters(routers);
  }

  private initializeMiddlewares = () => {
    this.app.use(express.json());
  };

  private initializeRouters = (routers: BaseRouterConfig[]) => {
    routers.forEach((router: BaseRouterConfig) => {
      this.app.use("/", router.createRoutes());
    });
  };

  listen = (): void => {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  };
}
