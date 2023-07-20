import Express from "express";
import { ProfileController, ProfileValidator } from "../controller/profile.controller";
import { BaseRouterConfig } from "./base.route";

export class ProfileRouter implements BaseRouterConfig {
  private path = "/profiles";
  private _router: Express.Router;
  private _controller: ProfileController;
  private _validator: ProfileValidator;

  constructor(router: Express.Router, controller: ProfileController, validator: ProfileValidator) {
    this._router = router;
    this._controller = controller;
    this._validator = validator;
  }

  createRoutes = (): Express.Router => {
    this._router.post(`${this.path}`, this._validator.validateCreation ,this._controller.create);
    return this._router;
  };
}
