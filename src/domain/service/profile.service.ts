import {
  ProfileRepository,
  profileRepositoryInstance,
} from "../../infra/repository/profile.repository";
import { ProfileEntity } from "../model/profile.model";
import { CreateProfileUseCase } from "../port/profile/create-profile.port";

class ProfileService implements CreateProfileUseCase {
  private static _instance: ProfileService;
  private _profileRepository: ProfileRepository;

  private constructor(profileRepository: ProfileRepository) {
    this._profileRepository = profileRepository;
  }

  static getInstance = (
    profileRepository: ProfileRepository,
  ): ProfileService => {
    ProfileService._instance ||
      (ProfileService._instance = new ProfileService(profileRepository));
    return ProfileService._instance;
  };

  async create(email: string): Promise<ProfileEntity> {
    const profile = new ProfileEntity(email);
    await this._profileRepository.save(profile);
    return profile;
  }
}

const profileServiceInstance = ProfileService.getInstance(
  profileRepositoryInstance,
);

export { ProfileService, profileServiceInstance };
