import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { postgresInstance } from "./postgres.dao";

class ProfileDao extends Model<
  InferAttributes<ProfileDao>,
  InferCreationAttributes<ProfileDao>
> {
  declare id: CreationOptional<string>;
  declare email: string;
}

ProfileDao.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: postgresInstance.getConnection(),
    tableName: "profile",
    modelName: "Profile",
  },
);

export { ProfileDao };
