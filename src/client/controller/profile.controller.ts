import Express from "express";
import { CreateProfileUseCase } from "../../domain/port/profile/create-profile.port";
import { CreateProfileRequest } from "../dto/create-profile.dto";
import { ErrorDto } from "../dto/error.dto";
import { ProfileDto } from "../dto/profile.dto";
import { profileServiceInstance } from "../../domain/service/profile.service";

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

const profileControllerInstance = ProfileController.getInstance(
  profileServiceInstance,
);

export { ProfileController, profileControllerInstance };
