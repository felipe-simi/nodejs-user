import { Server } from "./server";

const startup = () => {
    const app = new Server(3001, [
    ]);
    app.listen();
}

startup();
