import Express from "express";
import { ProfileController } from "../controller/profile.controller";
import { BaseRouterConfig } from "./base.route";

export class ProfileRouter implements BaseRouterConfig {
  private path = "/profiles";
  private _router: Express.Router;
  private _controller: ProfileController;

  constructor(router: Express.Router, controller: ProfileController) {
    this._router = router;
    this._controller = controller;
  }

  createRoutes = (): Express.Router => {
    this._router.post(`${this.path}`, this._controller.create);
    return this._router;
  };
}
