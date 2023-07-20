import Express, { NextFunction } from "express";
import { FieldValidationError, checkSchema, validationResult } from "express-validator";
import { CreateProfileUseCase } from "../../domain/port/profile/create-profile.port";
import { profileServiceInstance } from "../../domain/service/profile.service";
import { CreateProfileRequest } from "../dto/create-profile.dto";
import { ErrorDto } from "../dto/error.dto";
import { ProfileDto } from "../dto/profile.dto";

class ProfileController {
  private static _instance: ProfileController;
  private _createProfile: CreateProfileUseCase;

  private constructor(createProfile: CreateProfileUseCase) {
    this._createProfile = createProfile;
  }

  static getInstance = (
    createProfile: CreateProfileUseCase,
  ): ProfileController => {
    ProfileController._instance ||
      (ProfileController._instance = new ProfileController(createProfile));
    return ProfileController._instance;
  };

  create = async (
    request: Express.Request<never, never, CreateProfileRequest>,
    response: Express.Response<ProfileDto | ErrorDto>,
  ): Promise<void> => {
    const createdProfile = await this._createProfile.create(request.body.email);

    response.status(201).json({
      id: createdProfile.id,
      email: createdProfile.email,
    });
  };
}

class ProfileValidator {
  private static _instance: ProfileValidator;

  static getInstance = (): ProfileValidator => {
    ProfileValidator._instance ||
      (ProfileValidator._instance = new ProfileValidator());
    return ProfileValidator._instance;
  };

  validateCreation = async (
    request: Express.Request<never, never, CreateProfileRequest>,
    response: Express.Response<ProfileDto | ErrorDto>,
    next: NextFunction
  ): Promise<void> => {
    await checkSchema({
      email: { isEmail: true, errorMessage: "Email can not be empty and must be RFC compliant." }
    }, ["body"]).run(request);

    const validationErrors = validationResult(request);
    if (validationErrors.isEmpty()) {
      return next();
    }
    const errors = validationErrors.array() as FieldValidationError[];
    response.status(422).json({
      timestamp: new Date().toISOString(),
      status: 422,
      error: "Invalid profile",
      fields: errors.map(error => { return { name: error.path, message: error.msg } })
    });
  };
}


const profileControllerInstance = ProfileController.getInstance(
  profileServiceInstance,
);

const profileValidatorInstance = ProfileValidator.getInstance();

export { ProfileController, ProfileValidator, profileControllerInstance, profileValidatorInstance };
