import { Sequelize, Transaction } from "sequelize";
import { DatabaseConfig } from "./config.database";

class Postgres {
  private static _instance: Postgres;
  private _connection?: Sequelize;

  static getInstance = (): Postgres => {
    return this._instance || (this._instance = new Postgres());
  };

  getConnection = (): Sequelize => {
    return this._connection || (this._connection = this.createConnection());
  };

  createTransaction = async (): Promise<Transaction> => {
    return this.getConnection().transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
    });
  };

  private createConnection() {
    return new Sequelize({
      dialect: "postgres",
      database: DatabaseConfig.databaseName,
      host: DatabaseConfig.host,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      port: DatabaseConfig.port,
      define: {
        timestamps: true,
      },
      pool: {
        acquire: DatabaseConfig.acquireTimeout,
        idle: DatabaseConfig.idleTimeout,
        min: DatabaseConfig.minPoolSize,
        max: DatabaseConfig.maxPoolSize,
      },
    });
  }
}

const postgresInstance = Postgres.getInstance();

export { Postgres, postgresInstance };
