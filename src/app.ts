import Express from "express";
import { profileControllerInstance } from "./client/controller/profile.controller";
import { ProfileRouter } from "./client/route/profile.route";
import { ServerConfig } from "./client/server/config.server";
import { Server } from "./client/server/server";

const startup = () => {
  const app = new Server(ServerConfig.port, [
    new ProfileRouter(Express.Router(), profileControllerInstance),
  ]);
  app.listen();
};

startup();
