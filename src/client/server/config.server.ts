import Dotenv from 'dotenv';

Dotenv.config();

export class ServerConfig {
  static readonly environment = process.env.NODE_ENV ? process.env.NODE_ENV : '';
  static readonly port = process.env.PORT ? parseInt(process.env.PORT as string, 10) : 3000;
}
