import { ServerConfig } from "./client/server/config.server";
import { Server } from "./client/server/server";

const startup = () => {
    const app = new Server(ServerConfig.port, [
    ]);
    app.listen();
}

startup();
