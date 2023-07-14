import { Transaction } from "sequelize";
import { ProfileEntity } from "../../domain/model/profile.model";
import { ProfileDao } from "../dao/profile.dao";

class ProfileRepository {
  findById = async (
    id: string,
    transaction?: Transaction,
  ): Promise<ProfileEntity | null> => {
    const profileDao = await ProfileDao.findByPk(id, {
      transaction,
      lock: transaction?.LOCK.UPDATE,
    });
    if (profileDao) {
      return new ProfileEntity(profileDao.id, profileDao.email);
    } else {
      return null;
    }
  };

  update = async (profile: ProfileEntity, transaction?: Transaction) => {
    await ProfileDao.update(
      {
        email: profile.email,
      },
      {
        where: {
          id: profile.id,
        },
        transaction,
      },
    );
  };

  save = async (profile: ProfileEntity, transaction?: Transaction) => {
    await ProfileDao.create(
      {
        id: profile.id,
        email: profile.email,
      },
      {
        where: {
          id: profile.id,
        },
        transaction,
      },
    );
  };
}
const profileRepositoryInstance = new ProfileRepository();

export { ProfileDao, ProfileRepository, profileRepositoryInstance };
