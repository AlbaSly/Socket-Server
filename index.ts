import Server from "./classes/server";

const server: Server = new Server();

server.start(() => {
    console.log(`Servidor corriendo en el puerto: ${server.port}`);
});