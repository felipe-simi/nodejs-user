import { ProfileEntity } from "../../model/profile.model";

export interface CreateProfileUseCase {
  create(email: string): Promise<ProfileEntity>;
}
