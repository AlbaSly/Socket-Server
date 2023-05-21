import Server from "./classes/server";

/**Creación de un objeto Server */
const server: Server = Server.Instance;

server.start(() => {
    console.log(`Servidor corriendo en el puerto: ${server.port}`);
});